import Spinner from "./Spinner";

function Loading() {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-white z-60">
      <Spinner />
    </div>
  )
}

export default Loading