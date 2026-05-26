"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);


export default function Dashboard() {
  const data = {
    labels: [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ],

    datasets: [
      {
        label: "Renda",
        data: [1200, 1900, 3000, 2500, 4200, 5100, 6200, 7200, 6800, 7900, 8600, 9800],
        borderColor: "#f5061d",
        backgroundColor: "rgba(245,6,29,0.08)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#ff8800",
        pointBorderColor: "#ffb300",
        pointRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },

      tooltip: {
        backgroundColor: "#111113",
        borderColor: "#c0012a",
        borderWidth: 1,
        titleColor: "#ffb300",
        bodyColor: "#ffffff",
      },
    },

    scales: {
      x: {
        ticks: {
          color: "#71717a",
        },

        grid: {
          color: "rgba(255,255,255,0.04)",
        },
      },

      y: {
        ticks: {
          color: "#71717a",
        },

        grid: {
          color: "rgba(255,255,255,0.04)",
        },
      },
    },
  };

  const cardStyle = {
    background: "#111113",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: "24px",
    transition: "all .25s ease",
    backdropFilter: "blur(10px)",
  };

  const hoverEnter = (e) => {
    e.currentTarget.style.transform = "translateY(-4px)";
    e.currentTarget.style.background = "#151518";
    e.currentTarget.style.border =
      "1px solid rgba(192,1,42,0.45)";
  };

  const hoverLeave = (e) => {
    e.currentTarget.style.transform = "translateY(0px)";
    e.currentTarget.style.background = "#111113";
    e.currentTarget.style.border =
      "1px solid rgba(255,255,255,0.06)";
  };

  return (
    <div
      className="container-fluid py-4 px-3 px-lg-4"
      style={{
        background: "#09090b",
        minHeight: "100vh",
      }}
    >
      {/* HEADER */}
      <div className="mb-5">
        <h1
          className="fw-bold mb-1"
          style={{
            color: "#ffb300",
            fontSize: "2rem",
            letterSpacing: "-1px",
          }}
        >
          Dashboard
        </h1>

        <p
          className="mb-0"
          style={{
            color: "#71717a",
            fontSize: ".95rem",
          }}
        >
          Visão geral do desempenho da loja
        </p>
      </div>

      {/* KPI CARDS */}
      <div className="row g-4 mb-4">
        {/* CARD 1 */}
        <div className="col-12 col-md-6 col-xl-4">
          <div
            className="p-4 h-100"
            style={cardStyle}
            onMouseEnter={hoverEnter}
            onMouseLeave={hoverLeave}
          >
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <p
                  className="mb-2"
                  style={{
                    color: "#71717a",
                    fontSize: ".92rem",
                  }}
                >
                  Total de Pedidos
                </p>

                <h2
                  className="fw-bold mb-0"
                  style={{
                    color: "#ffffff",
                    letterSpacing: "-1px",
                  }}
                >
                  1.248
                </h2>
              </div>

              <div
                className="d-flex align-items-center justify-content-center"
                style={{
                  width: "58px",
                  height: "58px",
                  borderRadius: "18px",
                  background: "rgba(255,136,0,0.08)",
                  border: "1px solid rgba(255,136,0,0.12)",
                }}
              >
                <i
                  className="bi bi-bag-check-fill"
                  style={{
                    color: "#ff8800",
                    fontSize: "1.4rem",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* CARD 2 */}
        <div className="col-12 col-md-6 col-xl-4">
          <div
            className="p-4 h-100"
            style={cardStyle}
            onMouseEnter={hoverEnter}
            onMouseLeave={hoverLeave}
          >
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <p
                  className="mb-2"
                  style={{
                    color: "#71717a",
                    fontSize: ".92rem",
                  }}
                >
                  Renda do Mês
                </p>

                <h2
                  className="fw-bold mb-0"
                  style={{
                    color: "#ffffff",
                    letterSpacing: "-1px",
                  }}
                >
                  R$ 48.900
                </h2>
              </div>

              <div
                className="d-flex align-items-center justify-content-center"
                style={{
                  width: "58px",
                  height: "58px",
                  borderRadius: "18px",
                  background: "rgba(255,136,0,0.08)",
                  border: "1px solid rgba(255,136,0,0.12)",
                }}
              >
                <i
                  className="bi bi-currency-dollar"
                  style={{
                    color: "#ff8800",
                    fontSize: "1.4rem",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* CARD 3 */}
        <div className="col-12 col-md-6 col-xl-4">
          <div
            className="p-4 h-100"
            style={cardStyle}
            onMouseEnter={hoverEnter}
            onMouseLeave={hoverLeave}
          >
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <p
                  className="mb-2"
                  style={{
                    color: "#71717a",
                    fontSize: ".92rem",
                  }}
                >
                  Total de Clientes
                </p>

                <h2
                  className="fw-bold mb-0"
                  style={{
                    color: "#ffffff",
                    letterSpacing: "-1px",
                  }}
                >
                  8.492
                </h2>
              </div>

              <div
                className="d-flex align-items-center justify-content-center"
                style={{
                  width: "58px",
                  height: "58px",
                  borderRadius: "18px",
                  background: "rgba(255,136,0,0.08)",
                  border: "1px solid rgba(255,136,0,0.12)",
                }}
              >
                <i
                  className="bi bi-people-fill"
                  style={{
                    color: "#ff8800",
                    fontSize: "1.4rem",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* GRAPH */}
      <div
        className="p-4"
        style={{
          background: "#111113",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: "28px",
        }}
      >
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
          <div>
            <h4
              className="fw-bold mb-1"
              style={{
                color: "#ffffff",
                letterSpacing: "-0.5px",
              }}
            >
              Renda Anual
            </h4>

            <p
              className="mb-0"
              style={{
                color: "#71717a",
                fontSize: ".92rem",
              }}
            >
              Crescimento financeiro anual
            </p>
          </div>

          <div
            className="px-3 py-2"
            style={{
              background: "rgba(192,1,42,0.10)",
              border: "1px solid rgba(192,1,42,0.20)",
              borderRadius: "14px",
              color: "#ffb300",
              fontWeight: "600",
              fontSize: ".9rem",
            }}
          >
            +18.4%
          </div>
        </div>

        <div
          style={{
            width: "100%",
            height: "400px",
          }}
        >
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
}