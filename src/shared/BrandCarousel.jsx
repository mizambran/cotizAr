const BrandCarousel = () => {
  const marcas = [
    'Honda', 'Yamaha', 'Motomel', 'Corven', 'BMW', 
    'Kawasaki', 'Suzuki', 'Ducati', 'KTM', 'Bajaj', 
    'Zanella', 'Gilera', 'Royal Enfield', 'Triumph', 'Aprilia'
  ];

  // Duplicamos el array para el efecto de scroll infinito sin cortes
  const listaInfinita = [...marcas, ...marcas];

  return (
    <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', backgroundColor: '#e9ecef', padding: '20px 0' }}>
      <style>
        {`
          @keyframes scrollMarcas {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .cinta-marcas {
            display: inline-block;
            animation: scrollMarcas 30s linear infinite;
          }
          .cinta-marcas:hover {
            animation-play-state: paused;
          }
          .marca-item {
            display: inline-block;
            margin: 0 40px;
            font-size: 1.2rem;
            font-weight: bold;
            color: #1A5F7A;
          }
        `}
      </style>
      <div className="cinta-marcas">
        {listaInfinita.map((marca, indice) => (
          <span key={indice} className="marca-item">
            {marca}
          </span>
        ))}
      </div>
    </div>
  );
};

export default BrandCarousel;