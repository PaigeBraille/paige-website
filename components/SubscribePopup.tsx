export default function SubscribePopup(props: { onDismiss: () => void }) {
  return (
    <div
      className="fixed top-0 bottom-0 w-screen backdrop-blur"
      onClick={props.onDismiss}
    >
      <div className="relative w-screen p-4 md:p-8">
        <form
          className="flex flex-col gap-4 bg-blue-100 p-20 rounded shadow-xl max-w-sm mx-auto border border-primary"
          name="footer-subscribe"
          method="POST"
          data-netlify="true"
          action="/success"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <label className="font-medium text-primary" htmlFor="email">
            Subscribe to our newsletter
          </label>
          <input type="hidden" name="form-name" value="footer-subscribe" />
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Enter email here"
            className="py-1 px-2 font-light text-black outline-none text-sm"
          />
          <button
            className="bg-primary text-white font-medium rounded-sm py-1 px-4 text-sm hover:bg-blue-400"
            type="submit"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
}
