import Queue from "nq";

class RestUseCase {
  execute(method, path, options, session) {
    return new Queue.Rest().request(method, path, options, session);
  }
}

export default RestUseCase;
