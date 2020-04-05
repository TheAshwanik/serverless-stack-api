export function success(body) {
  return buildResponse(200, body);
}

export function failure(body, error) {
  return buildErrorResponse(500, body, error);
}

function buildResponse(statusCode, body) {
  return {
    statusCode: statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    },
    body: JSON.stringify(body),
  };
}
function buildErrorResponse(statusCode, body, error) {
  return {
    statusCode: statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    },
    body: JSON.stringify(body),
    error: error
  };
}
