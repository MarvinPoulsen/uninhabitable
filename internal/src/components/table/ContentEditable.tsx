import React, { useState, useMemo } from 'react';
import { CaseEntry, SpsUser } from '../../SPS';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import Icon from '@mdi/react';
import { mdiCheck, mdiDelete, mdiPencil } from '@mdi/js';
import { format } from 'date-fns';

interface CasesTable {
    editRow: React.JSX.Element;
    deleteRow: React.JSX.Element;
    id?: number;
    area: number;
    address: string;
    userId: string;
    caseStatus: string;
    caseDate: string;
    sagsId: number;
    note: string;
    completed: React.JSX.Element;
}
const columnHelper = createColumnHelper<CasesTable>();

const columns = [
    columnHelper.accessor('editRow', {
        header: () => '',
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('deleteRow', {
        header: () => '',
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('area', {
        header: () => 'Area',
        cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor('address', {
        header: () => 'Adresse',
        cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor('caseStatus', {
        header: 'Status',
    }),
    columnHelper.accessor('userId', {
        header: () => 'Bruger',
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('sagsId', {
        header: () => 'SBSYS ID',
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('caseDate', {
        header: () => 'Dato',
        cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor('note', {
        header: 'Note',
    }),
    columnHelper.accessor('completed', {
        header: 'Afsluttet',
        cell: (info) => info.getValue(),
    }),
];

interface ContentEditableProps {
    tableContent: CaseEntry[];
    onSave: () => void;
    resetForm: () => void;
    error: string;
    setError: (errorDescription) => void;
    setIsCaseModalActive: (isOn: boolean) => void;
    formInfo?: () => void;
    entry: CaseEntry;
    setEntry: (entry: CaseEntry) => void;
    setOnDelete: (entry: CaseEntry) => void;
    user: SpsUser;
}

const ContentEditable = (props: ContentEditableProps) => {
    const [onContentEditable, setOnContentEditeble] = useState<number>(null); // indeholder id

    const handleOnEdit = (element) => {
        try {
            let newEntry = props && {
                ...props.entry,
                id: element.id,
                area: element.area,
                address: element.address,
                userId: element.userId,
                caseStatus: element.caseStatus,
                caseDate: element.caseDate,
                sagsId: element.sagsId,
                note: element.note,
                completed: element.completed,
            };
            props.setEntry(newEntry);
        } catch (error) {
            console.log('Noget gik galt - Kun tal er tilladt');
        }
        props.setIsCaseModalActive(true);
    };
    const onDelete = (element) => {
        try {
            let newEntry = props && {
                ...props.entry,
                id: element.id,
                area: element.area,
                address: element.address,
                userId: element.userId,
                caseStatus: element.caseStatus,
                caseDate: element.caseDate,
                sagsId: element.sagsId,
                note: element.note,
                completed: element.completed,
            };
            props.setOnDelete(newEntry);
        } catch (error) {
            console.log('Noget gik galt - Kun tal er tilladt');
        }
    };

    const onChangeCompleted = (e) => {
        const id = parseInt(e.target.value);
        const on = e.target.checked;
    };
    const tableContent = props.tableContent.map((element) => {
        const dato = format(element.caseDate, 'dd-MM-yyyy');
    const approved = props.user.hasPermission('endpoint.ep_lk_owntable_editor');    
    const createIcon = (path, action, element) => {
        const color = approved ? undefined : 'lightgray';
        const cursor = approved ? 'pointer' : 'not-allowed';
        return (
            <a onClick={() => approved && action(element)} style={{ cursor }}>
                <Icon path={path} size={0.75} color={color} />
            </a>
        );
    };
    
    return {
        editRow: createIcon(mdiPencil, handleOnEdit, element),
        deleteRow: createIcon(mdiDelete, onDelete, element),
            area: element.area,
            address: element.address,
            userId: element.userId,
            sagsId: element.sagsId,
            caseStatus: element.caseStatus,
            caseDate: dato,
            note: element.note,
            completed: element.completed ? <Icon path={mdiCheck} size={0.75} /> : <></>,
                 
                // <input
                //     type="checkbox"
                //     checked={element.completed}
                //     // onChange={onChangeCompleted}
                //     // value={element.id}
                //     disabled
                // />
            
            id: element.id,
        };
    });

    const data = useMemo(() => tableContent, [props.tableContent]);
 
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <>
            <table className="table is-bordered is-narrow">
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id} className="is-umbra">
                            {headerGroup.headers.map((header) => (
                                <th key={header.id} className="has-text-white has-background-umbra-dark">
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead><tbody>
    {table.getRowModel().rows.map((row) => {
        const isCompleted = row.original.completed.props.path !== undefined ? 'has-background-umbra-lightest' : undefined;
        return (
            <tr key={row.id} className={isCompleted}>
                {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                ))}
            </tr>
        )
    })}
</tbody>

            </table>
        </>
    );
};

export default ContentEditable;
