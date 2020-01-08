export const INVALID_REQUEST_BODY_FORMAT = {
    statusCode: 422,
    code: '000',
    message: '요청한 데이터의 형식이 올바르지 않습니다.'
}

export const EXISTING_ID = {
    statusCode : 422,
    code : '001',
    message : '이미 존재하는 아이디입니다.'
}

export const INVALID_ACCOUNT = {
    statusCode: 422,
    code: '002',
    message: '아이디나 패스워드가 올바르지 않습니다.'
}

export const AUTH_REQUIRED = {
    statusCode : 401,
    code: '003',
    message: '이용하기 위해서는 권한이 필요합니다.'
}

export const INVALID_TOKEN = {
    statusCode : 422,
    code : '004',
    message: '올바르지 않은 인증 토큰입니다.'
}