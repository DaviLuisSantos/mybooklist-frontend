import React from 'react';

const Bar = ({ usuario }) => {
    return (
        <div className="fixed top-0 left-0 w-full bg-gray-800 text-white p-4 shadow-md z-50">
            <h1 className="text-center text-xl font-bold">Lista de leitura de : {usuario}</h1>
        </div>
    );
};

export default Bar;