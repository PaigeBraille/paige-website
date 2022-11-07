/*globals
	define,
	Module,
	WorkerGlobalScope
*/

(function (root, factory) {
  if (typeof exports === "object") {
    // CommonJS
    factory(exports);
  } else if (typeof define === "function" && define.amd) {
    // AMD. Register as an anonymous module.
    define(["exports"], factory);
  } else {
    // Browser globals
    factory((root.liblouis = {}));
  }
})(this, function (liblouis) {
  "use strict";

  var isBrowserGuiThread = typeof window !== "undefined";
  var isWebWorker =
    typeof WorkerGlobalScope !== "undefined" &&
    self instanceof WorkerGlobalScope;
  var isNode = !isBrowserGuiThread && !isWebWorker;

  var TABLE_URL = "";

  var FS_ORIGINAL_LOOKUP = null;

  var FS_DYNAMIC_LOOKUP = function dynloader(parent, name) {
    liblouisBuild.FS.lookup = liblouisBuild.FS_ORIGINAL_LOOKUP;

    var res;

    if (/(\.cti|\.ctb|\.utb|\.dis|\.uti|\.tbl|\.dic)$/.test(name)) {
      var url = TABLE_URL + name;
      res = liblouisBuild.FS.createLazyFile(parent, name, url, true, true);
    } else {
      res = liblouisBuild.FS.lookup.apply(this, [parent, name]);
    }

    liblouisBuild.FS.lookup = FS_DYNAMIC_LOOKUP;
    return res;
  };

  liblouis.setLiblouisBuild = function setLiblouisBuild(_capi) {
    if (liblouis._log_callback_fn_pointer) {
      liblouisBuild.Runtime.removeFunction(liblouis._log_callback_fn_pointer);
      liblouisBuild = _capi;
      liblouis.registerLogCallback(liblouis._log_callback_fn_pointer);
    } else {
      liblouisBuild = _capi;
      liblouis.registerLogCallback(null);
    }

    if (isNode) {
      this.enableOnDemandTableLoading("tables/");
    }

    FS_ORIGINAL_LOOKUP = liblouisBuild.FS.lookup;
  };

  liblouis.version = function () {
    return liblouisBuild.ccall("lou_version", "string", [], []);
  };
  liblouis.setLogLevel = function (num) {
    return liblouisBuild.ccall("lou_setLogLevel", "void", ["number"], [num]);
  };
  liblouis.getTable = function (str) {
    return liblouisBuild.ccall("lou_getTable", "number", ["string"], [str]);
  };
  liblouis.checkTable = function (str) {
    return liblouisBuild.ccall("lou_checkTable", "number", ["string"], [str]);
  };
  liblouis.free = function () {
    return liblouisBuild.ccall("lou_free", "void", [], []);
  };
  liblouis.charSize = function () {
    return liblouisBuild.ccall("lou_charSize", "number", [], []);
  };
  liblouis.logFile = function (str) {
    return liblouisBuild.ccall("lou_logFile", "void", ["string"], [str]);
  };
  liblouis.getFilesystem = function () {
    return liblouisBuild.FS;
  };

  liblouis.registerLogCallback = function (fn) {
    if (liblouis._log_callback_fn_pointer) {
      liblouisBuild.Runtime.removeFunction(liblouis._log_callback_fn_pointer);
    }

    if (fn === null) {
      fn = easyApiDefaultLogCallback;
    }

    liblouis._log_callback_fn_pointer = liblouisBuild.Runtime.addFunction(
      function (logLvl, msg) {
        fn(logLvl, liblouisBuild.Pointer_stringify(msg));
      }
    );

    liblouisBuild.ccall(
      "lou_registerLogCallback",
      "void",
      ["pointer"],
      [liblouis._log_callback_fn_pointer]
    );
  };

  liblouis.backTranslateString = function (table, inbuf) {
    return liblouis.translateString(table, inbuf, true);
  };

  liblouis.compileString = function (table, str) {
    var success = liblouisBuild.ccall(
      "lou_compileString",
      "number",
      ["string", "string"],
      [table, str]
    );
    return !!success;
  };

  liblouis.translateString = function (table, inbuf, backtranslate) {
    if (typeof inbuf !== "string" || inbuf.length === 0) {
      return "";
    }

    var mode = 0;

    var bufflen = inbuf.length * 4 + 2;
    var inbuff_ptr = liblouisBuild._malloc(bufflen);
    var outbuff_ptr = liblouisBuild._malloc(bufflen);

    // UCS-2 to UTF-16LE
    // TODO: internally no conversion is done, only copies values
    // to memory, which is okay for BMP
    // TODO: this writes an unnecessary null byte
    liblouisBuild.stringToUTF16(inbuf, inbuff_ptr, bufflen);

    // in emscripten we need a 32bit cell for each pointer
    var bufflen_ptr = liblouisBuild._malloc(4);
    var strlen_ptr = liblouisBuild._malloc(4);

    liblouisBuild.setValue(bufflen_ptr, bufflen, "i32");
    liblouisBuild.setValue(strlen_ptr, bufflen, "i32");

    var success = liblouisBuild.ccall(
      backtranslate ? "lou_backTranslateString" : "lou_translateString",
      "number",
      ["string", "number", "number", "number", "number", "number", "number"],
      [
        table,
        inbuff_ptr,
        strlen_ptr,
        outbuff_ptr,
        bufflen_ptr,
        null,
        null,
        mode,
      ]
    );

    if (!success) {
      return null;
    }

    // string does not seam to be terminated by null byte,
    // therefore we cannot use emscripten to convert the buffer to
    // string.
    //var outstr = UTF16ToString(outbuff_ptr);
    var start_index = outbuff_ptr >> 1;
    var end_index = start_index + liblouisBuild.getValue(bufflen_ptr, "i32");
    var outstr_buff = liblouisBuild.HEAP16.slice(start_index, end_index);

    liblouisBuild._free(outbuff_ptr);
    liblouisBuild._free(inbuff_ptr);
    liblouisBuild._free(bufflen_ptr);
    liblouisBuild._free(strlen_ptr);

    return String.fromCharCode.apply(null, outstr_buff);
  };

  liblouis.loadTable = function (tablename, url) {
    liblouisBuild.FS.createPreloadedFile("/", tablename, url, true, true);
  };

  liblouis.enableOnDemandTableLoading = function (tableurl) {
    TABLE_URL = tableurl;
    if (!isNode) {
      liblouisBuild.FS.lookup = FS_DYNAMIC_LOOKUP;
    } else {
      liblouisBuild.FS.mkdir("/tables");
      var path = require("path");
      liblouisBuild.FS.mount(
        liblouisBuild.NODEFS,
        { root: path.resolve(__dirname, "tables/") },
        tableurl
      );
    }
  };

  liblouis.disableOnDemandTableLoading = function () {
    liblouisBuild.FS.lookup = FS_ORIGINAL_LOOKUP;
  };

  var _CONSOLE_MAPPING = {
    ALL: "log",
    DEBUG: "log",
    INFO: "info",
    WARN: "warn",
    ERROR: "error",
    FATAL: "error",
  };

  liblouis.LOG = {};
  liblouis.LOG[(liblouis.LOG.ALL = 0)] = "ALL";
  liblouis.LOG[(liblouis.LOG.DEBUG = 10000)] = "DEBUG";
  liblouis.LOG[(liblouis.LOG.INFO = 20000)] = "INFO";
  liblouis.LOG[(liblouis.LOG.WARN = 30000)] = "WARN";
  liblouis.LOG[(liblouis.LOG.ERROR = 40000)] = "ERROR";
  liblouis.LOG[(liblouis.LOG.FATAL = 50000)] = "FATAL";
  liblouis.LOG[(liblouis.LOG.OFF = 60000)] = "OFF";

  function easyApiDefaultLogCallback(lvl_id, msg) {
    var lvl_name = liblouis.LOG[lvl_id];
    msg = "[" + lvl_name + "] " + msg;

    if (console) {
      var fn = console[_CONSOLE_MAPPING[lvl_name]];
      if (fn) {
        fn(msg);
      } else {
        console.log(msg);
      }
    }
  }

  if (!isNode) {
    if (typeof liblouis_emscripten !== "undefined") {
      liblouis.setLiblouisBuild(liblouis_emscripten);
    } else if (typeof Module !== "undefined") {
      liblouis.setLiblouisBuild(Module);
    }
  }

  globalThis.liblouis = liblouis;
});
