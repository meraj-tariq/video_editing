const withPayloadType = <T = {}>() => (t: T) => ({
    payload: t,
  });
  
  export const withoutPayloadType = () => () => ({
    payload: null,
  });
  
  export default withPayloadType;
  