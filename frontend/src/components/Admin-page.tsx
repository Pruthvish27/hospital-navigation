import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from 'react-toastify';
import { supabase } from "@/utils/supabaseClient";

interface Column {
  name: string;
  type: string;
  defaultValue: string;
  isPrimary: boolean;
}

interface Table {
  name: string;
  description: string;
  columns: Column[];
}

const AdminPage = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [tables, setTables] = useState<Table[]>([]);
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [showCreateTablePopup, setShowCreateTablePopup] = useState(false);
  const [newTableName, setNewTableName] = useState("");
  const [newTableDescription, setNewTableDescription] = useState("");
  const [columns, setColumns] = useState<Column[]>([]);
  const [tableData, setTableData] = useState<Record<string, any>[]>([]);
  const [showInsertPopup, setShowInsertPopup] = useState(false);
  const [insertData, setInsertData] = useState<Record<string, any>>({});


  // Fetch existing tables from the database on component mount
  useEffect(() => {
    const fetchTables = async () => {
      const { data, error } = await supabase
        .from("tables") // Assuming you have a "tables" table in Supabase
        .select("*");

      if (error) {
        console.error("Error fetching tables:", error);
      } else {
        setTables(data || []);
      }
    };

    fetchTables();
  }, []); // Empty dependency array ensures this runs only once on mount

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleCreateTable = () => {
    setShowCreateTablePopup(true);
  };

  const handleAddColumn = () => {
    if (columns.length < 20) {
      setColumns([...columns, { name: "", type: "text", defaultValue: "", isPrimary: false }]);
    }
  };

  const handleSaveTable = async () => {
    try {
      const tableName = newTableName.toLowerCase().replace(/\s+/g, "_"); // Convert to a valid table name
      const columnsDefinition = columns
        .map((column) => {
          let columnType = column.type === "number" ? "integer" : column.type; // Map "number" to "integer"
          return `${column.name} ${columnType} ${column.isPrimary ? "PRIMARY KEY" : ""} ${column.defaultValue ? `DEFAULT '${column.defaultValue}'` : ""}`;
        })
        .join(", ");

      const createTableQuery = `
        CREATE TABLE ${tableName} (
          ${columnsDefinition}
        );
      `;

      const { data: createTableData, error: createTableError } = await supabase
        .rpc("execute_sql", { sql: createTableQuery });

      if (createTableError) {
        console.error("Error creating table:", createTableError);
        return;
      }

      console.log("Table created successfully:", createTableData);

      // Step 2: Save the table metadata in the `tables` table
      const { data: insertMetadataData, error: insertMetadataError } = await supabase
        .from("tables")
        .insert([
          {
            name: newTableName,
            description: newTableDescription,
            columns: columns,
          },
        ]);

      if (insertMetadataError) {
        console.error("Error saving table metadata:", insertMetadataError);
        return;
      }

      console.log("Table metadata saved successfully:", insertMetadataData);

      setTables([...tables, { name: newTableName, description: newTableDescription, columns }]);
      setShowCreateTablePopup(false);
      setNewTableName("");
      setNewTableDescription("");
      setColumns([]);
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  const handleInsertRow = () => {
    if (!selectedTable) return;
  
    const initialData: Record<string, any> = {};
    selectedTable.columns.forEach((column) => {
      initialData[column.name] = ""; // Default empty input
    });
  
    setInsertData(initialData);
    setShowInsertPopup(true);
  };

  const handleSubmitInsert = async () => {
    if (!selectedTable) return;
  
    try {
      const { error } = await supabase
        .from(selectedTable.name.toLowerCase().replace(/\s+/g, "_"))
        .insert([insertData]);
  
      if (error) {
        toast.error("Error inserting data");
        console.error("Error inserting data:", error);
        return;
      }
  
      toast.success("Data inserted successfully");
      setShowInsertPopup(false); // Close the popup
  
      // Fetch updated table data
      const { data: newData, error: fetchError } = await supabase
        .from(selectedTable.name.toLowerCase().replace(/\s+/g, "_"))
        .select("*");
  
      if (fetchError) {
        toast.error("Error fetching updated data");
        console.error("Error fetching updated data:", fetchError);
        return;
      }
  
      setTableData(newData || []);
    } catch (err) {
      toast.error("Unexpected error");
      console.error("Unexpected error:", err);
    }
  };
  

  const handleDeleteTable = async () => {
    if (!selectedTable) return; // Ensure a table is selected

    const confirmDelete = window.confirm(`Are you sure you want to delete the table "${selectedTable.name}"? This action cannot be undone.`);
    if (!confirmDelete) return; // Exit if the user cancels the confirmation

    try {
      // Step 1: Delete the table from Supabase
      const tableName = selectedTable.name.toLowerCase().replace(/\s+/g, "_"); // Ensure the table name is valid
      const deleteTableQuery = `DROP TABLE ${tableName};`;

      const { data: deleteTableData, error: deleteTableError } = await supabase
        .rpc("execute_sql", { sql: deleteTableQuery });

      if (deleteTableError) {
        console.error("Error deleting table:", deleteTableError);
        return;
      }

      console.log("Table deleted successfully:", deleteTableData);

      // Step 2: Delete the table metadata from the `tables` table
      const { error: deleteMetadataError } = await supabase
        .from("tables")
        .delete()
        .eq("name", selectedTable.name);

      if (deleteMetadataError) {
        console.error("Error deleting table metadata:", deleteMetadataError);
        return;
      }

      console.log("Table metadata deleted successfully");

      // Step 3: Update the UI
      setTables(tables.filter((table) => table.name !== selectedTable.name));
      setSelectedTable(null); // Deselect the table
      setTableData([]); // Clear the table data
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  // const handleAddColumnToTable = async () => {
  //   if (!selectedTable) return; // Ensure a table is selected

  //   // Step 1: Prompt for column details
  //   const columnName = prompt("Enter the name of the new column:");
  //   if (!columnName) return; // Exit if the user cancels the prompt

  //   const columnType = prompt("Enter the type of the new column (text, number, date):");
  //   if (!columnType) return; // Exit if the user cancels the prompt

  //   const defaultValue = prompt("Enter the default value for the column (leave blank for none):");

  //   const isPrimary = window.confirm("Should this column be a primary key?");

  //   // Check if a primary key already exists
  //   if (isPrimary && selectedTable.columns.some((col) => col.isPrimary)) {
  //     alert("A primary key already exists for this table. Only one primary key is allowed.");
  //     return;
  //   }

  //   try {
  //     // Step 2: Add the column to the table in Supabase
  //     const tableName = selectedTable.name.toLowerCase().replace(/\s+/g, "_"); // Ensure the table name is valid
  //     const sqlType = columnType === "number" ? "integer" : columnType; // Map "number" to "integer"

  //     // Construct the SQL query
  //     let addColumnQuery = `
  //       ALTER TABLE ${tableName}
  //       ADD COLUMN ${columnName} ${sqlType} ${defaultValue ? `DEFAULT '${defaultValue}'` : ""};
  //     `;

  //     // If the column is a primary key, add the PRIMARY KEY constraint
  //     if (isPrimary) {
  //       addColumnQuery = `
  //         ALTER TABLE ${tableName}
  //         ADD COLUMN ${columnName} ${sqlType} ${defaultValue ? `DEFAULT '${defaultValue}'` : ""} PRIMARY KEY;
  //       `;
  //     }

  //     // Execute the SQL query to add the column
  //     const { data: addColumnData, error: addColumnError } = await supabase
  //       .rpc("execute_sql", { sql: addColumnQuery });

  //     if (addColumnError) {
  //       console.error("Error adding column:", addColumnError);
  //       return;
  //     }

  //     console.log("Column added successfully:", addColumnData);

  //     // Step 3: Update the table metadata in the `tables` table
  //     const updatedColumns = [
  //       ...selectedTable.columns,
  //       { name: columnName, type: columnType, defaultValue: defaultValue || "", isPrimary },
  //     ];
  //     const { error: updateMetadataError } = await supabase
  //       .from("tables")
  //       .update({ columns: updatedColumns })
  //       .eq("name", selectedTable.name);

  //     if (updateMetadataError) {
  //       console.error("Error updating table metadata:", updateMetadataError);
  //       return;
  //     }

  //     console.log("Table metadata updated successfully");

  //     // Step 4: Update the UI
  //     setSelectedTable({ ...selectedTable, columns: updatedColumns });
  //     setTables(tables.map((table) =>
  //       table.name === selectedTable.name ? { ...table, columns: updatedColumns } : table
  //     ));
  //   } catch (err) {
  //     console.error("Unexpected error:", err);
  //   }
  // };

  // const handleRemoveColumnFromTable = async () => {
  //   if (!selectedTable) return; // Ensure a table is selected

  //   if (selectedTable.columns.length === 0) {
  //     alert("No columns to remove!");
  //     return;
  //   }

  //   const columnName = prompt("Enter the name of the column to remove:");
  //   if (!columnName) return; // Exit if the user cancels the prompt

  //   const columnToRemove = selectedTable.columns.find((col) => col.name === columnName);
  //   if (!columnToRemove) {
  //     alert("Column not found!");
  //     return;
  //   }

  //   const confirmRemove = window.confirm(`Are you sure you want to remove the column "${columnName}"?`);
  //   if (!confirmRemove) return; // Exit if the user cancels the confirmation

  //   try {
  //     // Step 1: Remove the column from the table in Supabase
  //     const tableName = selectedTable.name.toLowerCase().replace(/\s+/g, "_"); // Ensure the table name is valid
  //     const removeColumnQuery = `
  //       ALTER TABLE ${tableName}
  //       DROP COLUMN ${columnName};
  //     `;

  //     const { data: removeColumnData, error: removeColumnError } = await supabase
  //       .rpc("execute_sql", { sql: removeColumnQuery });

  //     if (removeColumnError) {
  //       console.error("Error removing column:", removeColumnError);
  //       return;
  //     }

  //     console.log("Column removed successfully:", removeColumnData);

  //     // Step 2: Update the table metadata in the `tables` table
  //     const updatedColumns = selectedTable.columns.filter((col) => col.name !== columnName);
  //     const { error: updateMetadataError } = await supabase
  //       .from("tables")
  //       .update({ columns: updatedColumns })
  //       .eq("name", selectedTable.name);

  //     if (updateMetadataError) {
  //       console.error("Error updating table metadata:", updateMetadataError);
  //       return;
  //     }

  //     console.log("Table metadata updated successfully");

  //     // Step 3: Update the UI
  //     setSelectedTable({ ...selectedTable, columns: updatedColumns });
  //     setTables(tables.map((table) =>
  //       table.name === selectedTable.name ? { ...table, columns: updatedColumns } : table
  //     ));
  //   } catch (err) {
  //     console.error("Unexpected error:", err);
  //   }
  // };

  // const handleEditColumn = async () => {
  //   if (!selectedTable) return; // Ensure a table is selected

  //   const columnName = prompt("Enter the name of the column to edit:");
  //   if (!columnName) return; // Exit if the user cancels the prompt

  //   const columnToEdit = selectedTable.columns.find((col) => col.name === columnName);
  //   if (!columnToEdit) {
  //     alert("Column not found!");
  //     return;
  //   }

  //   const newColumnName = prompt("Enter the new name for the column:", columnToEdit.name);
  //   if (!newColumnName) return; // Exit if the user cancels the prompt

  //   const newColumnType = prompt("Enter the new type for the column (text, number, date):", columnToEdit.type);
  //   if (!newColumnType) return; // Exit if the user cancels the prompt

  //   const newDefaultValue = prompt("Enter the new default value for the column (leave blank for none):", columnToEdit.defaultValue);

  //   const newIsPrimary = window.confirm("Should this column be a primary key?");

  //   try {
  //     // Step 1: Update the column in the table in Supabase
  //     const tableName = selectedTable.name.toLowerCase().replace(/\s+/g, "_"); // Ensure the table name is valid
  //     const sqlType = newColumnType === "number" ? "integer" : newColumnType; // Map "number" to "integer"
  //     const updateColumnQuery = `
  //       ALTER TABLE ${tableName}
  //       ALTER COLUMN ${columnName} TYPE ${sqlType} ${newDefaultValue ? `DEFAULT '${newDefaultValue}'` : ""} ${newIsPrimary ? "PRIMARY KEY" : ""};
  //     `;

  //     const { data: updateColumnData, error: updateColumnError } = await supabase
  //       .rpc("execute_sql", { sql: updateColumnQuery });

  //     if (updateColumnError) {
  //       console.error("Error updating column:", updateColumnError);
  //       return;
  //     }

  //     console.log("Column updated successfully:", updateColumnData);

  //     // Step 2: Update the table metadata in the `tables` table
  //     const updatedColumns = selectedTable.columns.map((col) =>
  //       col.name === columnName
  //         ? { name: newColumnName, type: newColumnType, defaultValue: newDefaultValue || "", isPrimary: newIsPrimary }
  //         : col
  //     );
  //     const { error: updateMetadataError } = await supabase
  //       .from("tables")
  //       .update({ columns: updatedColumns })
  //       .eq("name", selectedTable.name);

  //     if (updateMetadataError) {
  //       console.error("Error updating table metadata:", updateMetadataError);
  //       return;
  //     }

  //     console.log("Table metadata updated successfully");

  //     // Step 3: Update the UI
  //     setSelectedTable({ ...selectedTable, columns: updatedColumns });
  //     setTables(tables.map((table) =>
  //       table.name === selectedTable.name ? { ...table, columns: updatedColumns } : table
  //     ));
  //   } catch (err) {
  //     console.error("Unexpected error:", err);
  //   }
  // };

  const handleEditRow = async (row: Record<string, any>) => {
    if (!selectedTable) return;

    try {
      const updatedData: Record<string, any> = {};
      for (const column of selectedTable.columns) {
        const value = prompt(`Enter new value for ${column.name}:`, row[column.name]);
        if (value === null) {
          toast.info("Edit canceled by user");
          return;
        }
        updatedData[column.name] = value;
      }

      const { error: updateError } = await supabase
        .from(selectedTable.name.toLowerCase().replace(/\s+/g, "_"))
        .update(updatedData)
        .eq("id", row.id); // Assuming each row has a unique "id" column

      if (updateError) {
        toast.error("Error updating row");
        console.error("Error updating row:", updateError);
        return;
      }

      toast.success("Row updated successfully");

      const { data: newData, error: fetchError } = await supabase
        .from(selectedTable.name.toLowerCase().replace(/\s+/g, "_"))
        .select("*");

      if (fetchError) {
        toast.error("Error fetching updated data");
        console.error("Error fetching updated data:", fetchError);
        return;
      }

      setTableData(newData || []);
    } catch (err) {
      toast.error("Unexpected error");
      console.error("Unexpected error:", err);
    }
  };

  const handleRemoveRow = async (row: Record<string, any>) => {
    if (!selectedTable) return;

    const confirmRemove = window.confirm("Are you sure you want to remove this row?");
    if (!confirmRemove) return;

    try {
      const { error: deleteError } = await supabase
        .from(selectedTable.name.toLowerCase().replace(/\s+/g, "_"))
        .delete()
        .eq("id", row.id); // Assuming each row has a unique "id" column

      if (deleteError) {
        toast.error("Error removing row");
        console.error("Error removing row:", deleteError);
        return;
      }

      toast.success("Row removed successfully");

      const { data: newData, error: fetchError } = await supabase
        .from(selectedTable.name.toLowerCase().replace(/\s+/g, "_"))
        .select("*");

      if (fetchError) {
        toast.error("Error fetching updated data");
        console.error("Error fetching updated data:", fetchError);
        return;
      }

      setTableData(newData || []);
    } catch (err) {
      toast.error("Unexpected error");
      console.error("Unexpected error:", err);
    }
  };

  const handleTableClick = async (table: Table) => {
    setSelectedTable(table);

    // Fetch data from the selected table
    const { data, error } = await supabase
      .from(table.name.toLowerCase().replace(/\s+/g, "_")) // Ensure the table name is valid
      .select("*"); // Select all columns

    if (error) {
      console.error("Error fetching table data:", error);
    } else {
      setTableData(data || []); // Store the fetched data in state
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-[#f8f8f8] to-[#e0f8e0] p-8 flex"
    >
      {/* Sidebar */}
      <div className={`bg-white p-6 rounded-lg shadow-md ${isSidebarOpen ? "w-64" : "w-16"} transition-all duration-300`}>
        <div className="flex items-center justify-between mb-6">
          {isSidebarOpen ? (
            <h2 className="text-xl font-bold text-[#2E8B57]">Admin Settings</h2>
          ) : (
            <button onClick={toggleSidebar} className="text-2xl">
              ⚙️
            </button>
          )}
          <button onClick={toggleSidebar} className="text-2xl">
            {isSidebarOpen ? "✕" : "⚙️"}
          </button>
        </div>
        {isSidebarOpen && (
          <div className="flex flex-col gap-4">
            <Button
              onClick={handleCreateTable}
              className="w-full px-6 py-3 bg-[#2E8B57] text-white text-lg font-bold rounded-lg shadow-md hover:bg-[#3CB371] hover:scale-105 transition-all duration-300"
            >
              Create Table
            </Button>
            <Button
              onClick={() => setSelectedTable(null)}
              className="w-full px-6 py-3 bg-[#2E8B57] text-white text-lg font-bold rounded-lg shadow-md hover:bg-[#3CB371] hover:scale-105 transition-all duration-300"
            >
              View Tables
            </Button>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-[#2E8B57]">Admin Dashboard</h1>
          <Button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-[#2E8B57] text-white text-lg font-bold rounded-lg shadow-md hover:bg-[#3CB371] hover:scale-105 transition-all duration-300"
          >
            Back to Home
          </Button>
        </div>

        {/* Table Management Section */}
        {selectedTable ? (
          <div>
            <h2 className="text-2xl font-bold text-[#2E8B57] mb-4">{selectedTable.name}</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-[#2E8B57]">Columns</h3>
                <div className="flex gap-4">
                  <Button
                    onClick={handleInsertRow}
                    className="px-6 py-3 bg-[#2E8B57] text-white text-lg font-bold rounded-lg shadow-md hover:bg-[#3CB371] hover:scale-105 transition-all duration-300"
                  >
                    Add Details
                  </Button>
                  {/* <Button
                    onClick={handleAddColumnToTable}
                    className="px-6 py-3 bg-blue-500 text-white text-lg font-bold rounded-lg shadow-md hover:bg-blue-600 hover:scale-105 transition-all duration-300"
                  >
                    Add Column
                  </Button> */}
                  {/* <Button
                    onClick={handleRemoveColumnFromTable}
                    className="px-6 py-3 bg-orange-500 text-white text-lg font-bold rounded-lg shadow-md hover:bg-orange-600 hover:scale-105 transition-all duration-300"
                  >
                    Remove Column
                  </Button> */}
                  {/* <Button
                    onClick={handleEditColumn}
                    className="px-6 py-3 bg-purple-500 text-white text-lg font-bold rounded-lg shadow-md hover:bg-purple-600 hover:scale-105 transition-all duration-300"
                  >
                    Edit Column
                  </Button> */}
                  <Button
                    onClick={handleDeleteTable}
                    className="px-6 py-3 bg-red-500 text-white text-lg font-bold rounded-lg shadow-md hover:bg-red-600 hover:scale-105 transition-all duration-300"
                  >
                    Delete Table
                  </Button>
                </div>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="bg-[#2E8B57] text-white">
                    {selectedTable.columns.map((column, index) => (
                      <th key={index} className="px-4 py-2">
                        {column.name}
                      </th>
                    ))}
                    <th className="px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, rowIndex) => (
                    <tr key={rowIndex} className="border-b">
                      {selectedTable.columns.map((column, colIndex) => (
                        <td key={colIndex} className="px-4 py-2 text-center">
                          {row[column.name]}
                        </td>
                      ))}
                      <td className="px-4 py-2 text-center">
                        <Button
                          onClick={() => handleEditRow(row)}
                          className="px-4 py-2 bg-blue-500 text-white text-sm font-bold rounded-lg shadow-md hover:bg-blue-600 hover:scale-105 transition-all duration-300"
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleRemoveRow(row)}
                          className="ml-2 px-4 py-2 bg-red-500 text-white text-sm font-bold rounded-lg shadow-md hover:bg-red-600 hover:scale-105 transition-all duration-300"
                        >
                          Remove
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-[#2E8B57] mb-4">Tables</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              {tables.map((table, index) => (
                <div
                  key={index}
                  onClick={() => handleTableClick(table)}
                  className="cursor-pointer p-4 border-b hover:bg-gray-100"
                >
                  {table.name}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Create Table Popup */}
      {showCreateTablePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-md w-96 max-h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-[#2E8B57] mb-6">Create Table</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Table Name</label>
              <input
                type="text"
                value={newTableName}
                onChange={(e) => setNewTableName(e.target.value)}
                className="mt-1 p-2 w-full border rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <input
                type="text"
                value={newTableDescription}
                onChange={(e) => setNewTableDescription(e.target.value)}
                className="mt-1 p-2 w-full border rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Columns</label>
              <div className="max-h-[40vh] overflow-y-auto">
                {columns.map((column, index) => (
                  <div key={index} className="mb-2">
                    <input
                      type="text"
                      placeholder="Column Name"
                      value={column.name}
                      onChange={(e) => {
                        const newColumns = [...columns];
                        newColumns[index].name = e.target.value;
                        setColumns(newColumns);
                      }}
                      className="mt-1 p-2 w-full border rounded-lg"
                    />
                    <select
                      value={column.type}
                      onChange={(e) => {
                        const newColumns = [...columns];
                        newColumns[index].type = e.target.value;
                        setColumns(newColumns);
                      }}
                      className="mt-1 p-2 w-full border rounded-lg"
                    >
                      <option value="text">Text</option>
                      <option value="number">Number</option>
                      <option value="date">Date</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Default Value"
                      value={column.defaultValue}
                      onChange={(e) => {
                        const newColumns = [...columns];
                        newColumns[index].defaultValue = e.target.value;
                        setColumns(newColumns);
                      }}
                      className="mt-1 p-2 w-full border rounded-lg"
                    />
                    <label className="block text-sm font-medium text-gray-700">
                      <input
                        type="checkbox"
                        checked={column.isPrimary}
                        onChange={(e) => {
                          const newColumns = [...columns];
                          newColumns[index].isPrimary = e.target.checked;
                          setColumns(newColumns);
                        }}
                        className="mr-2"
                      />
                      Primary Key
                    </label>
                  </div>
                ))}
              </div>
              <Button
                onClick={handleAddColumn}
                className="w-full px-6 py-3 bg-[#2E8B57] text-white text-lg font-bold rounded-lg shadow-md hover:bg-[#3CB371] hover:scale-105 transition-all duration-300"
              >
                Add Column
              </Button>
            </div>
            <div className="flex justify-end gap-4">
              <Button
                onClick={() => setShowCreateTablePopup(false)}
                className="px-6 py-3 bg-red-500 text-white text-lg font-bold rounded-lg shadow-md hover:bg-red-600 hover:scale-105 transition-all duration-300"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveTable}
                className="px-6 py-3 bg-[#2E8B57] text-white text-lg font-bold rounded-lg shadow-md hover:bg-[#3CB371] hover:scale-105 transition-all duration-300"
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      )}

      {showInsertPopup && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
      <h2 className="text-xl font-bold mb-4">Insert Data</h2>
      {selectedTable.columns.map((column, index) => (
        <div key={index} className="mb-3">
          <label className="block text-sm font-medium text-gray-700">{column.name}</label>
          <input
            type="text"
            value={insertData[column.name] || ""}
            onChange={(e) => setInsertData({ ...insertData, [column.name]: e.target.value })}
            className="w-full p-2 border rounded-lg"
          />
        </div>
      ))}
      <div className="flex justify-end mt-4">
        <Button onClick={() => setShowInsertPopup(false)} className="mr-2 bg-red-500 hover:bg-red-600">
          Cancel
        </Button>
        <Button onClick={handleSubmitInsert} className="bg-green-500 hover:bg-green-600">
          Insert
        </Button>
      </div>
    </div>
  </div>
)}

    </motion.div>
  );
};

export default AdminPage;