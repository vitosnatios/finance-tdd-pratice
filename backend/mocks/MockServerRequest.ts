export default class MockServerRequest {
  static async post(controllerMethod: any, body: any) {
    return await controllerMethod(
      { body },
      {
        status: (statusNumber: number) => ({
          json: (responseObject: any) => ({
            status: statusNumber,
            ...responseObject,
          }),
        }),
      }
    );
  }
}
