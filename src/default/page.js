import ProductTable from "../components/data-table/data_table";
import items from "./data.json";

export default function DefaultPage() {
    return (
        <main style={styles.main}>
            <h1 style={styles.title}>Tools Inventory</h1>
            <p style={styles.subtitle}>
                Static table with search, filter, sorting, and side panel details.
            </p>
            <ProductTable items={items} />
        </main>
    );
}

const styles = {
    main: {
        padding: "24px",
        maxWidth: "1200px",
        margin: "0 auto",
    },
    title: {
        marginBottom: "6px",
    },
    subtitle: {
        marginTop: 0,
        marginBottom: "16px",
        color: "#475569",
    },
};
