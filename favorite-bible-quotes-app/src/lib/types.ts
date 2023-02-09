import pg from 'pg'

export interface Celebrities {
    full_name: string,
    image_url: string

}

export type CelebrityData = pg.QueryResult<Celebrities> | Celebrities[]
