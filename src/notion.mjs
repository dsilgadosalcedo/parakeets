import { APIErrorCode, Client } from '@notionhq/client'

const NOTION_DATABASE_ID='cbbfdaff6b6748a6bfbef4f57a4cea68'

const notion = new Client({
    auth: import.meta.env.NOTION_API_KEY
})

export const getImages = async () => {
    const query = { database_id: NOTION_DATABASE_ID }
    
    const { results } = await notion.databases.query(query)
    
    return results.map(page => {
        const { properties } = page
        const { name, image } = properties
        
        return {
            name: name.title[0].plain_text,
            url: image.files[0].file.url
        }
    })
}
