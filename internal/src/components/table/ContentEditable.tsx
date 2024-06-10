import React, { useState, useReducer, useMemo } from 'react';
import { CaseEntry } from '../../SPS';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import Icon from '@mdi/react';
import { mdiDelete, mdiPencil } from '@mdi/js';
import { format } from 'date-fns';

interface CasesTable {
    editRow: React.JSX.Element;
    deleteRow: React.JSX.Element;
    id?: number;
    area: number;
    userId: string;
    caseDate: string;
    sagsId: number;
    caseStatus: string;
    completed: React.JSX.Element;
}
const columnHelper = createColumnHelper<CasesTable>();
console.log('columnHelper', columnHelper);

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
    columnHelper.accessor('caseStatus', {
        header: 'Status',
    }),
    columnHelper.accessor('completed', {
        header: 'Afsluttet',
        cell: (info) => info.getValue(),
    }),
];

interface ContentEditableProps {
    tableContent: CaseEntry[];
    onSave: () => void;
    setEditEntry: (id) => void;
    resetForm: () => void;
    setIsNewCaseActive: (isOn: boolean) => void;
    error: string;
    setError: (errorDescription) => void;
    setIsCaseModalActive: (isOn: boolean) => void;
    formInfo?: () => void;
}

const ContentEditable = (props: ContentEditableProps) => {
    console.log('ContentEditable: ', props);

    const [onContentEditable, setOnContentEditeble] = useState<number>(null); // indeholder id

    const handleOnEdit = (element) => {
        console.log('element: ', element);
        props.setIsCaseModalActive(true)
        props.setEditEntry(element.id);
        // props.setIsNewCaseActive(true);
        // props.setError(null);
        // setOnContentEditeble(element.id)
    };
    const onDelete = (e) => {
        console.log('e: ', e);
    };

    const onChangeCompleted = (e) => {
        const id = parseInt(e.target.value);
        const on = e.target.checked;
        console.log('id - on: ', id, on);
    };
    const tableContent = props.tableContent.map((element) => {
        const dato = format(element.caseDate, 'dd-MM-yyyy');
        // const dato = 'dd-MM-yyyy';

        return {
            editRow: (
                <a onClick={() => handleOnEdit(element)}>
                    <Icon path={mdiPencil} size={0.7} />
                </a>
            ),
            deleteRow: (
                <a onClick={() => onDelete(element.id)}>
                    <Icon path={mdiDelete} size={0.7} />
                </a>
            ),
            area: element.area,
            userId: element.userId,
            sagsId: element.sagsId,
            caseDate: dato,
            caseStatus: element.caseStatus,
            completed: (
                <input 
                    type="checkbox" 
                    checked={element.completed} 
                    onChange={onChangeCompleted} 
                    value={element.id} 
                />
            ),
            id:element.id,
        };
    });

    const data = useMemo(() => tableContent, [props.tableContent]);

    // const [data, _setData] = useState(() => [...caseData]);
    const rerender = useReducer(() => ({}), {})[1];

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    console.log('getHeaderGroups: ',table.getHeaderGroups())
    console.log('getRowModel: ',table.getRowModel())
    return (
        <>
            <table className="table is-bordered is-narrow">
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id} className="is-light">
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                                // <td key={cell.id} contentEditable={cell.row.original.id === onContentEditable} onClick={()=>console.log('cell: ',cell)}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={() => rerender()} className="button">
                Rerender
            </button>
        </>
    );
};

export default ContentEditable;
