import styled from 'styled-components';
import React, { ChangeEvent, FC } from 'react';
import { IUser } from '../../services/types';

interface ControlBarProps {
    filterKey: keyof IUser;
    filterStr: string;
    onFilterKeyChange: (newKey: keyof IUser) => void;
    onFilterStrChange: (newStr: string) => void;
    TABLE_HEADERS: Array<keyof IUser>
}

const FilterBarContainer = styled.div`
    display: flex;
    width: 100%;
    margin: 0em auto 1em auto;
    gap: 2em;
`;

const Select = styled.select`
    padding: 0.75em 1.25em;
    border: 1px solid #ccc;
    border-radius: 4px;
    flex: 1;
    width:100%;
`;

const Input = styled.input`
width:100%;
    padding: 0.75em 1.25em;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    flex:2;
`;

export const FilterBar: FC<ControlBarProps> = ({ filterKey, filterStr, onFilterKeyChange, onFilterStrChange, TABLE_HEADERS }) => {
    const handleFilterKeyChange = (event: ChangeEvent<HTMLSelectElement>) => {
        onFilterKeyChange(event.target.value as keyof IUser);
    };

    const handleFilterStrChange = (event: ChangeEvent<HTMLInputElement>) => {
        onFilterStrChange(event.target.value);
    };

    return (
        <FilterBarContainer>
            <Select value={filterKey} onChange={handleFilterKeyChange}>
                {TABLE_HEADERS.map((header) => (
                    <option key={header} value={header}>
                        {header.charAt(0).toUpperCase() + header.slice(1)} {/* Convert the first character to uppercase */}
                    </option>
                ))}
            </Select>
            <Input
                type="text"
                placeholder="Filter"
                value={filterStr}
                onChange={handleFilterStrChange}
            />
        </FilterBarContainer>
    );
}
