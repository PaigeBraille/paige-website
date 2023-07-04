export default function SubscribePopup(props: {
  togglePopup: () => void;
  isVisible: boolean;
}) {
  return (
    <div
      className={`fixed top-0 bottom-0 w-screen ${
        props.isVisible ? "backdrop-blur visible" : "invisible -z-50"
      }`}
      onClick={props.togglePopup}
    >
      <div className="relative w-screen p-4 md:p-8">
        <button className="sr-only" onClick={props.togglePopup}>
          Close
        </button>
        <form
          className={`flex flex-col gap-2 md:gap-4 bg-primary p-4 md:p-8 lg:p-12 rounded shadow-xl max-w-sm mx-auto border border-primary leading-tight ${
            props.isVisible ? "opacity-100" : "opacity-0"
          } transition-opacity duration-700`}
          name="footer-subscribe"
          method="POST"
          data-netlify="true"
          action="/success"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <label className="font-extrabold text-white" htmlFor="email">
            Join the Paige community
          </label>
          <span className="font-light text-white text-sm">
            Subscribe to be the first to know about new product launches and
            offers!
          </span>
          <input type="hidden" name="form-name" value="footer-subscribe" />
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Enter email here"
            className="py-1 px-2 font-light text-black outline-none text-sm"
            tabIndex={0}
          />
          <button
            className="bg-white text-primary  font-medium rounded-sm py-1 px-4 text-sm hover:bg-blue-400"
            type="submit"
          >
            Subscribe
          </button>
          <span className="font-extralight text-white text-xs">
           By clicking join the waitlist you agree to having your data handled in accordance to our privacy policy. After signing up we will keep you informed as we develop our product and let you know when we’re ready. Joining the waitlist is non-commital and you may unsubscribe at any time.
          </span>
        </form>
      </div>
    </div>
  );
}
