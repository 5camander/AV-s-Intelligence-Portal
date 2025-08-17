export default function WebGISPage() {
  return (
    <div style={{ width: '100vw', height: '100vh', margin: 0, padding: 0 }}>
      <iframe
        src="/webgis-static/sumatera-selatan.html"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          margin: 0,
          padding: 0
        }}
        title="WebGIS Sumatera Selatan"
      />
    </div>
  );
}
