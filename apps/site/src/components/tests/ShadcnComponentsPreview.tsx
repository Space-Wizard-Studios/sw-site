import React from 'react';
import { Button } from '@components/ui/button';
import { Badge } from '@components/ui/badge';
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';

const ShadcnComponentsPreview: React.FC = () => {
    return (
        <div className='text-on-surface flex w-full flex-col justify-between gap-4 rounded-lg p-4'>
            <table className='w-full text-left'>
                <thead>
                    <tr>
                        <th colSpan={6}>Component Type</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Buttons</td>
                        <td>
                            <table className='p-1'>
                                <thead>
                                    <tr>
                                        <td>Type</td>
                                        <td>Primary</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Icon</td>
                                        <td>
                                            <Button variant='primary' size='icon'>X</Button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Small</td>
                                        <td>
                                            <Button variant='primary' size='sm'>Primary</Button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Default</td>
                                        <td>
                                            <Button variant='primary'>Primary</Button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Large</td>
                                        <td>
                                            <Button variant='primary' size='lg'>Primary</Button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td>
                        <table className='p-1'>
                                <thead>
                                    <tr>
                                        <td>Type</td>
                                        <td>Secondary</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Icon</td>
                                        <td>
                                            <Button variant='secondary' size='icon'>X</Button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Small</td>
                                        <td>
                                            <Button variant='secondary' size='sm'>Secondary</Button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Default</td>
                                        <td>
                                            <Button variant='secondary'>Secondary</Button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Large</td>
                                        <td>
                                            <Button variant='secondary' size='lg'>Secondary</Button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td>
                            <table className='p-1'>
                                <thead>
                                    <tr>
                                        <td>Type</td>
                                        <td>Outline</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Icon</td>
                                        <td>
                                            <Button variant='outline' size='icon'>X</Button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Small</td>
                                        <td>
                                            <Button variant='outline' size='sm'>Outline</Button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Default</td>
                                        <td>
                                            <Button variant='outline'>Outline</Button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Large</td>
                                        <td>
                                            <Button variant='outline' size='lg'>Outline</Button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td>
                            <table className='p-1'>
                                <thead>
                                    <tr>
                                        <td>Type</td>
                                        <td>Ghost</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Icon</td>
                                        <td>
                                            <Button variant='ghost' size='icon'>X</Button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Small</td>
                                        <td>
                                            <Button variant='ghost' size='sm'>Ghost</Button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Default</td>
                                        <td>
                                            <Button variant='ghost'>Ghost</Button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Large</td>
                                        <td>
                                            <Button variant='ghost' size='lg'>Ghost</Button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td>Badges</td>
                        <td>
                            <Badge variant='primary'>Primary</Badge>
                        </td>
                        <td>
                            <Badge variant='secondary'>Secondary</Badge>
                        </td>
                        <td>
                            <Badge variant='outline'>Outline</Badge>
                        </td>
                        <td>
                            <Badge variant='ghost'>Ghost</Badge>
                        </td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Dropdown</td>
                        <td colSpan={5}>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Button variant='outline'>Outline Button</Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>Options</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>Item 1</DropdownMenuItem>
                                    <DropdownMenuItem>Item 2</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default ShadcnComponentsPreview;
