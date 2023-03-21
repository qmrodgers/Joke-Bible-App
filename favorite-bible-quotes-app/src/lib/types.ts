import pg from 'pg'

export interface Celebrity {
    full_name: string,
    image_url: string

}

export interface Users {
    id: string,
    username: string,
    role: string
}

export type Identity_Token_Response = {
id_token: string,
access_code: string,
expires_in: number,
token_type: string
}


export type Verified_JWT_Object = {
    protected_header?: {
        'alg': 'RS256',
        'typ': 'JWT',
        'kid': string
    },
    payload: {
        'nickname'?: string
        'name'?: string,
        'picture': string | undefined,
        'email': string
        'email_verified': boolean,
        'iss': string,
        'iat': number,
        'exp': number,
        'sub': string,
        'sid': string
    }

}
export type CelebrityData = pg.QueryResult<Celebrity> | Celebrity[]
export type UserData = pg.QueryResult<Users> | Users[]
