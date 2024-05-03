import { unstable_noStore as noStore } from 'next/cache'; 
import { pool } from '@/db'; 

const ITEMS_PER_PAGE = 6; 
export async function fetchFilteredItems(
    query: string, 
    currentPage: number 
) {
    noStore(); 

    const offset = (currentPage - 1) * ITEMS_PER_PAGE; 

    try {
        const res = await pool.query(`
            SELECT * FROM item
            WHERE name ILIKE '%${query}%' 
            ORDER BY name ASC 
            LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset} 
        `); 
    
        return res.rows; 
    } catch (error) {
        console.log('Database error: ', error); 
        throw new Error('Failed to fetch items.'); 
    }
}

export async function fetchItemById(item_id: string) {
    noStore(); 

    try {
        const res = await pool.query(`
            SELECT * FROM item
            WHERE item_id = '${item_id}'
        `); 

        return res.rows[0]; 
    } catch (error) {
        console.log('Database error: ', error); 
        throw new Error('Failed to fetch item by id.'); 
    }
}

export async function getItemsPages(query: string) {
    noStore(); 

    try {
        const count = await pool.query(`
            SELECT COUNT(*) 
            FROM item
            WHERE 
                name ILIKE '${`%${query}%`}'
        `); 

        const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE); 
        return totalPages; 
    } catch (error) {
        console.log('Database error: ', error); 
        throw new Error('Failed to fetch total number of items.'); 
    }
} 