import Link from "next/link";

export default function RootPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "#eee9e4",
        color: "#181614",
        fontFamily: "Arial, Helvetica, sans-serif",
        padding: 24
      }}
    >
      <Link href="/tr/" style={{ fontSize: 18, fontWeight: 700 }}>
        terkib23
      </Link>
    </main>
  );
}
