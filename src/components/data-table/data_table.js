"use client";

import React, { useEffect, useMemo, useState } from "react";

export default function ProductTable({ items = [] }) {
    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("All");
    const [sortKey, setSortKey] = useState("id");
    const [sortOrder, setSortOrder] = useState("asc");
    const [selectedId, setSelectedId] = useState(null);
    const [hoveredRowId, setHoveredRowId] = useState(null);
    const [toolOrder, setToolOrder] = useState([]);
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const categories = useMemo(() => {
        return ["All", ...new Set(items.map((item) => item.category))];
    }, [items]);

    const filteredAndSortedItems = useMemo(() => {
        const query = search.trim().toLowerCase();
        const filtered = items.filter((item) => {
            const matchesSearch =
                item.name.toLowerCase().includes(query) ||
                String(item.id).includes(query) ||
                item.category.toLowerCase().includes(query);
            const matchesCategory =
                categoryFilter === "All" || item.category === categoryFilter;
             return matchesSearch && matchesCategory;
        });

        const sorted = [...filtered].sort((a, b) => {
            const valueA = a[sortKey];
            const valueB = b[sortKey];

            if (typeof valueA === "number" && typeof valueB === "number") {
                return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
            }

            const textA = String(valueA).toLowerCase();
            const textB = String(valueB).toLowerCase();
            if (textA < textB) return sortOrder === "asc" ? -1 : 1;
            if (textA > textB) return sortOrder === "asc" ? 1 : -1;
            return 0;
        });

        return sorted;
    }, [items, search, categoryFilter, sortKey, sortOrder]);

    const selectedItem = useMemo(() => {
        return filteredAndSortedItems.find((item) => item.id === selectedId) ?? null;
    }, [filteredAndSortedItems, selectedId]);

    const totalPages = Math.max(1, Math.ceil(filteredAndSortedItems.length / pageSize));

    const paginatedItems = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        return filteredAndSortedItems.slice(start, start + pageSize);
    }, [filteredAndSortedItems, currentPage, pageSize]);

    useEffect(() => {
        setCurrentPage(1);
    }, [search, categoryFilter, sortKey, sortOrder, pageSize]);

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);

    useEffect(() => {
        if (!selectedId) return;
        const stillVisible = filteredAndSortedItems.some((item) => item.id === selectedId);
        if (!stillVisible) {
            setSelectedId(null);
        }
    }, [filteredAndSortedItems, selectedId]);

    function handleSort(key) {
        if (sortKey === key) {
            setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
            return;
        }
        setSortKey(key);
        setSortOrder("asc");
    }

    function sortLabel(key) {
        if (sortKey !== key) return "";
        return sortOrder === "asc" ? " (asc)" : " (desc)";
    }

    function addToOrder(item) {
        setToolOrder((prev) => {
            const existing = prev.find((entry) => entry.id === item.id);
            if (existing) {
                return prev.map((entry) =>
                    entry.id === item.id
                        ? { ...entry, quantity: entry.quantity + 1 }
                        : entry
                );
            }
            return [...prev, { ...item, quantity: 1 }];
        });
    }

    function updateOrderQuantity(itemId, delta) {
        setToolOrder((prev) =>
            prev
                .map((entry) =>
                    entry.id === itemId
                        ? { ...entry, quantity: entry.quantity + delta }
                        : entry
                )
                .filter((entry) => entry.quantity > 0)
        );
    }

    const orderQtyTotal = toolOrder.reduce((sum, entry) => sum + entry.quantity, 0);
    const orderGrandTotal = toolOrder.reduce(
        (sum, entry) => sum + entry.price * entry.quantity,
        0
    );

    return (
        <div style={styles.pageWrap}>
            <div style={styles.tableCard}>
                <div style={styles.toolbar}>
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by id, name, or category..."
                        style={styles.input}
                    />
                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        style={styles.select}
                    >
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                    <div style={styles.pageSizeWrap}>
                        <label htmlFor="table-page-size" style={styles.pageSizeLabel}>
                            Rows
                        </label>
                        <select
                            id="table-page-size"
                            value={pageSize}
                            onChange={(e) => setPageSize(Number(e.target.value))}
                            style={styles.select}
                        >
                            {[5, 10, 20, 50].map((size) => (
                                <option key={size} value={size}>
                                    {size}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div style={styles.tableScroll}>
                    <table style={styles.table}>
                        <thead style={styles.thead}>
                            <tr>
                                <th style={styles.th} onClick={() => handleSort("id")}>
                                    ID{sortLabel("id")}
                                </th>
                                <th style={styles.th} onClick={() => handleSort("name")}>
                                    Product Name{sortLabel("name")}
                                </th>
                                <th style={styles.th} onClick={() => handleSort("price")}>
                                    Price{sortLabel("price")}
                                </th>
                                <th style={styles.th} onClick={() => handleSort("category")}>
                                    Category{sortLabel("category")}
                                </th>
                                <th style={styles.th}>Order</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedItems.map((item) => {
                                const isSelected = selectedItem?.id === item.id;
                                const isHovered = hoveredRowId === item.id;
                                const orderEntry = toolOrder.find((entry) => entry.id === item.id);
                                return (
                                    <tr
                                        key={item.id}
                                        onClick={() =>
                                            setSelectedId((prev) => (prev === item.id ? null : item.id))
                                        }
                                        onMouseEnter={() => setHoveredRowId(item.id)}
                                        onMouseLeave={() => setHoveredRowId(null)}
                                        style={
                                            isSelected
                                                ? { ...styles.row, ...styles.selectedRow }
                                                : isHovered
                                                  ? { ...styles.row, ...styles.hoverRow }
                                                  : styles.row
                                        }
                                    >
                                        <td style={styles.td}>{item.id}</td>
                                        <td style={styles.td}>{item.name}</td>
                                        <td style={styles.td}>PHP {item.price.toLocaleString()}</td>
                                        <td style={styles.td}>{item.category}</td>
                                        <td style={styles.td}>
                                            {!orderEntry ? (
                                                <button
                                                    type="button"
                                                    style={styles.orderButton}
                                                    onClick={(event) => {
                                                        event.stopPropagation();
                                                        addToOrder(item);
                                                    }}
                                                >
                                                    Add
                                                </button>
                                            ) : (
                                                <div style={styles.qtyWrap}>
                                                    <button
                                                        type="button"
                                                        style={styles.qtyButton}
                                                        onClick={(event) => {
                                                            event.stopPropagation();
                                                            updateOrderQuantity(item.id, -1);
                                                        }}
                                                    >
                                                        -
                                                    </button>
                                                    <span style={styles.qtyText}>{orderEntry.quantity}</span>
                                                    <button
                                                        type="button"
                                                        style={styles.qtyButton}
                                                        onClick={(event) => {
                                                            event.stopPropagation();
                                                            updateOrderQuantity(item.id, 1);
                                                        }}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                            {filteredAndSortedItems.length === 0 && (
                                <tr>
                                    <td colSpan={5} style={styles.emptyState}>
                                        No results found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div style={styles.paginationBar}>
                    <button
                        type="button"
                        style={styles.orderButton}
                        onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                    >
                        Prev
                    </button>
                    <span style={styles.pageText}>
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        type="button"
                        style={styles.orderButton}
                        onClick={() =>
                            setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                        }
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>

            <aside style={styles.sidePanel}>
                {selectedItem && (
                    <>
                        <h3 style={styles.panelTitle}>Tool Details</h3>
                        <div style={styles.panelBody}>
                            <p>
                                <strong>ID:</strong> {selectedItem.id}
                            </p>
                            <p>
                                <strong>Name:</strong> {selectedItem.name}
                            </p>
                            <p>
                                <strong>Price:</strong> PHP {selectedItem.price.toLocaleString()}
                            </p>
                            <p>
                                <strong>Category:</strong> {selectedItem.category}
                            </p>
                        </div>
                        <hr style={styles.separator} />
                    </>
                )}
                <h4 style={styles.orderTitle}>Tool Order</h4>
                <p style={styles.orderMeta}>
                    Items: {orderQtyTotal} | Total: PHP {orderGrandTotal.toLocaleString()}
                </p>
                {toolOrder.length === 0 ? (
                    <p style={styles.panelPlaceholder}>No tools added yet.</p>
                ) : (
                    <div style={styles.orderList}>
                        {toolOrder.map((entry) => (
                            <div key={entry.id} style={styles.orderRow}>
                                <span style={styles.orderName}>{entry.name}</span>
                                <div style={styles.qtyWrap}>
                                    <button
                                        type="button"
                                        style={styles.qtyButton}
                                        onClick={() => updateOrderQuantity(entry.id, -1)}
                                    >
                                        -
                                    </button>
                                    <span style={styles.qtyText}>{entry.quantity}</span>
                                    <button
                                        type="button"
                                        style={styles.qtyButton}
                                        onClick={() => updateOrderQuantity(entry.id, 1)}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </aside>
        </div>
    );
}

const styles = {
    pageWrap: {
        display: "flex",
        flexWrap: "wrap",
        gap: "16px",
        alignItems: "start",
    },
    tableCard: {
        flex: "1 1 640px",
        minWidth: 0,
        border: "1px solid #d1d5db",
        borderRadius: "10px",
        backgroundColor: "#ffffff",
        overflow: "hidden",
    },
    toolbar: {
        display: "flex",
        flexWrap: "wrap",
        gap: "12px",
        padding: "12px",
        borderBottom: "1px solid #e5e7eb",
        backgroundColor: "#f8fafc",
    },
    input: {
        flex: 1,
        minWidth: 0,
        height: "38px",
        border: "1px solid #cbd5e1",
        borderRadius: "8px",
        padding: "0 10px",
        outline: "none",
    },
    select: {
        width: "180px",
        height: "38px",
        border: "1px solid #cbd5e1",
        borderRadius: "8px",
        padding: "0 8px",
        backgroundColor: "#fff",
    },
    tableScroll: {
        maxHeight: "480px",
        overflowY: "auto",
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
    },
    thead: {
        position: "sticky",
        top: 0,
        zIndex: 1,
        backgroundColor: "#f1f5f9",
    },
    th: {
        textAlign: "left",
        padding: "10px 12px",
        borderBottom: "1px solid #e5e7eb",
        cursor: "pointer",
        userSelect: "none",
        whiteSpace: "nowrap",
    },
    td: {
        padding: "10px 12px",
        borderBottom: "1px solid #f1f5f9",
    },
    row: {
        transition: "background-color 180ms ease",
    },
    selectedRow: {
        backgroundColor: "#eff6ff",
    },
    hoverRow: {
        backgroundColor: "#e5e7eb",
    },
    emptyState: {
        padding: "24px",
        textAlign: "center",
        color: "#64748b",
    },
    sidePanel: {
        flex: "1 1 280px",
        border: "1px solid #d1d5db",
        borderRadius: "10px",
        padding: "16px",
        backgroundColor: "#ffffff",
        minHeight: "220px",
    },
    panelTitle: {
        marginTop: 0,
        marginBottom: "12px",
    },
    panelBody: {
        display: "grid",
        gap: "6px",
        lineHeight: 1.5,
    },
    panelPlaceholder: {
        color: "#64748b",
        margin: 0,
    },
    orderButton: {
        border: "1px solid #cbd5e1",
        borderRadius: "8px",
        padding: "4px 10px",
        backgroundColor: "#fff",
        cursor: "pointer",
    },
    qtyWrap: {
        display: "inline-flex",
        alignItems: "center",
        border: "1px solid #cbd5e1",
        borderRadius: "8px",
        overflow: "hidden",
        backgroundColor: "#fff",
    },
    qtyButton: {
        width: "28px",
        height: "28px",
        border: 0,
        backgroundColor: "#f8fafc",
        cursor: "pointer",
        fontSize: "16px",
        lineHeight: 1,
    },
    qtyText: {
        minWidth: "28px",
        textAlign: "center",
        fontSize: "13px",
    },
    separator: {
        border: 0,
        borderTop: "1px solid #e2e8f0",
        margin: "14px 0",
    },
    orderTitle: {
        margin: "0 0 6px 0",
    },
    orderMeta: {
        margin: "0 0 10px 0",
        color: "#475569",
        fontSize: "13px",
    },
    orderList: {
        display: "grid",
        gap: "8px",
    },
    orderRow: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "8px",
    },
    orderName: {
        fontSize: "13px",
        color: "#1f2937",
    },
    pageSizeWrap: {
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
    },
    pageSizeLabel: {
        fontSize: "13px",
        color: "#475569",
    },
    paginationBar: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "12px",
        padding: "10px 12px",
        borderTop: "1px solid #e5e7eb",
        backgroundColor: "#f8fafc",
    },
    pageText: {
        fontSize: "13px",
        color: "#334155",
    },
};
