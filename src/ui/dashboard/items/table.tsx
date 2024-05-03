import { Card, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Button } from '@tremor/react'; 
import { fetchFilteredItems } from '@/lib/data'; 
import { Item } from '@/lib/definitions'; 
import { DeleteItemButton, EditItemButton } from '../buttons';

export default async function ItemsTable({
    query, 
    currentPage 
}: {
    query: string; 
    currentPage: number;
}) {
    const items = await fetchFilteredItems(query, currentPage); 
    // console.log(items); 

    return (
        <Card className="mt-10">
            <p className="text-xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">Items</p>
            <Table className="mt-5">
                <TableHead>
                    <TableRow>
                        <TableHeaderCell>ID</TableHeaderCell>
                        <TableHeaderCell>Name</TableHeaderCell>
                        <TableHeaderCell>Quantity</TableHeaderCell>
                        <TableHeaderCell>Consumable</TableHeaderCell>
                        <TableHeaderCell>
                            <span className="sr-only">Edit</span>
                        </TableHeaderCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items?.map((item: Item) => (
                        <TableRow key={item.item_id}>
                            <TableCell className="font-mono">{item.item_id}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell className="font-mono">{item.quantity}</TableCell>
                            <TableCell>{item.consumable ? 'Yes' : 'No'}</TableCell>
                            <TableCell>
                                <div className="flex justify-end gap-4">
                                    <EditItemButton itemId={item.item_id} /> 
                                    <DeleteItemButton itemId={item.item_id} itemName={item.name} /> 
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card>
    ); 
}