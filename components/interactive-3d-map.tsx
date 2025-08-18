"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import "leaflet/dist/leaflet.css"
import * as L from "leaflet"

interface Route {
  id: string
  from: string
  to: string
  duration: string
  coordinates: { lat: number; lng: number }[]
  transfer?: string
}

const routes: Route[] = [
  {
    id: "germany",
    from: "Киев",
    to: "Берлин",
    duration: "18-24ч",
    transfer: "через Варшаву",
    coordinates: [
      { lat: 50.4501, lng: 30.5234 }, // Киев
      { lat: 52.2297, lng: 21.0122 }, // Варшава
      { lat: 52.52, lng: 13.405 }, // Берлин
    ],
  },
  {
    id: "poland",
    from: "Киев",
    to: "Варшава",
    duration: "12-16ч",
    coordinates: [
      { lat: 50.4501, lng: 30.5234 }, // Киев
      { lat: 52.2297, lng: 21.0122 }, // Варшава
    ],
  },
  {
    id: "lithuania",
    from: "Киев",
    to: "Вильнюс",
    duration: "16-18ч",
    transfer: "через Варшаву",
    coordinates: [
      { lat: 50.4501, lng: 30.5234 }, // Киев
      { lat: 52.2297, lng: 21.0122 }, // Варшава
      { lat: 54.6872, lng: 25.2797 }, // Вильнюс
    ],
  },
  {
    id: "latvia",
    from: "Киев",
    to: "Рига",
    duration: "18-20ч",
    transfer: "через Варшаву",
    coordinates: [
      { lat: 50.4501, lng: 30.5234 }, // Киев
      { lat: 52.2297, lng: 21.0122 }, // Варшава
      { lat: 56.9496, lng: 24.1052 }, // Рига
    ],
  },
  {
    id: "estonia",
    from: "Киев",
    to: "Таллин",
    duration: "20-22ч",
    transfer: "через Варшаву",
    coordinates: [
      { lat: 50.4501, lng: 30.5234 }, // Киев
      { lat: 52.2297, lng: 21.0122 }, // Варшава
      { lat: 59.437, lng: 24.7536 }, // Таллин
    ],
  },
  {
    id: "belarus",
    from: "Киев",
    to: "Минск",
    duration: "12-16ч",
    transfer: "через Варшаву",
    coordinates: [
      { lat: 50.4501, lng: 30.5234 }, // Киев
      { lat: 52.2297, lng: 21.0122 }, // Варшава
      { lat: 53.9045, lng: 27.5615 }, // Минск
    ],
  },
  {
    id: "russia",
    from: "Киев",
    to: "Москва",
    duration: "24-30ч",
    transfer: "через Варшаву и Минск",
    coordinates: [
      { lat: 50.4501, lng: 30.5234 }, // Киев
      { lat: 52.2297, lng: 21.0122 }, // Варшава
      { lat: 53.9045, lng: 27.5615 }, // Минск
      { lat: 55.7558, lng: 37.6176 }, // Москва
    ],
  },
]

const europeanCapitals = [
  { name: "Киев", flag: "🇺🇦", lat: 50.4501, lng: 30.5234, isOrigin: true },
  { name: "Варшава", flag: "🇵🇱", lat: 52.2297, lng: 21.0122, hasRoutes: true },
  { name: "Берлин", flag: "🇩🇪", lat: 52.52, lng: 13.405, hasRoutes: true },
  { name: "Вильнюс", flag: "🇱🇹", lat: 54.6872, lng: 25.2797, hasRoutes: true },
  { name: "Рига", flag: "🇱🇻", lat: 56.9496, lng: 24.1052, hasRoutes: true },
  { name: "Таллин", flag: "🇪🇪", lat: 59.437, lng: 24.7536, hasRoutes: true },
  { name: "Минск", flag: "🇧🇾", lat: 53.9045, lng: 27.5615, hasRoutes: true },
  { name: "Москва", flag: "🇷🇺", lat: 55.7558, lng: 37.6176, hasRoutes: true },
]

const countryGroups = [
  { id: "all", name: "Все направления", countries: routes.map((r) => r.id) },
  { id: "eu", name: "Европейский Союз", countries: ["germany", "poland", "lithuania", "latvia", "estonia"] },
  { id: "eastern", name: "Восточная Европа", countries: ["belarus", "russia"] },
]

const countryBorders = {
  germany: {
    type: "Feature",
    properties: { name: "Germany" },
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [5.866, 47.27],
          [15.042, 47.27],
          [15.042, 55.099],
          [5.866, 55.099],
          [5.866, 47.27],
        ],
      ],
    },
  },
  poland: {
    type: "Feature",
    properties: { name: "Poland" },
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [14.123, 49.002],
          [24.15, 49.002],
          [24.15, 54.836],
          [14.123, 54.836],
          [14.123, 49.002],
        ],
      ],
    },
  },
  lithuania: {
    type: "Feature",
    properties: { name: "Lithuania" },
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [20.941, 53.897],
          [26.836, 53.897],
          [26.836, 56.45],
          [20.941, 56.45],
          [20.941, 53.897],
        ],
      ],
    },
  },
  latvia: {
    type: "Feature",
    properties: { name: "Latvia" },
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [20.974, 55.675],
          [28.241, 55.675],
          [28.241, 58.085],
          [20.974, 58.085],
          [20.974, 55.675],
        ],
      ],
    },
  },
  estonia: {
    type: "Feature",
    properties: { name: "Estonia" },
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [21.837, 57.516],
          [28.21, 57.516],
          [28.21, 59.676],
          [21.837, 59.676],
          [21.837, 57.516],
        ],
      ],
    },
  },
  belarus: {
    type: "Feature",
    properties: { name: "Belarus" },
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [23.178, 51.262],
          [32.77, 51.262],
          [32.77, 56.172],
          [23.178, 56.172],
          [23.178, 51.262],
        ],
      ],
    },
  },
  russia: {
    type: "Feature",
    properties: { name: "Russia" },
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [32.77, 51.262],
          [40.227, 51.262],
          [40.227, 58.595],
          [32.77, 58.595],
          [32.77, 51.262],
        ],
      ],
    },
  },
}

export function Interactive3DMap() {
  const [selectedCountryGroup, setSelectedCountryGroup] = useState<string>("all")
  const [activeRoute, setActiveRoute] = useState<string | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const mapRef = useRef<HTMLDivElement>(null)
  const [mapInstance, setMapInstance] = useState<any>(null)
  const [routeMarkers, setRouteMarkers] = useState<any[]>([])
  const [routePolylines, setRoutePolylines] = useState<any[]>([])
  const [visibleMarkers, setVisibleMarkers] = useState<any[]>([])
  const [animatingMarkers, setAnimatingMarkers] = useState<Set<string>>(new Set())
  const [countryLayers, setCountryLayers] = useState<any[]>([])
  const resizeTimeoutRef = useRef<NodeJS.Timeout>()

  const handleResize = useCallback(() => {
    if (resizeTimeoutRef.current) {
      clearTimeout(resizeTimeoutRef.current)
    }
    resizeTimeoutRef.current = setTimeout(() => {
      if (mapInstance) {
        try {
          mapInstance.invalidateSize({ animate: false, pan: false })
        } catch (error) {
          if (error instanceof Error && error.message.includes("ResizeObserver")) {
            return
          }
          console.error("Map resize error:", error)
        }
      }
    }, 100)
  }, [mapInstance])

  useEffect(() => {
    const originalError = window.onerror
    window.onerror = (message, source, lineno, colno, error) => {
      if (typeof message === "string" && message.includes("ResizeObserver loop completed")) {
        return true
      }
      if (originalError) {
        return originalError(message, source, lineno, colno, error)
      }
      return false
    }

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      if (event.reason?.message?.includes("ResizeObserver")) {
        event.preventDefault()
      }
    }

    window.addEventListener("unhandledrejection", handleUnhandledRejection)
    window.addEventListener("resize", handleResize)

    return () => {
      window.onerror = originalError
      window.removeEventListener("unhandledrejection", handleUnhandledRejection)
      window.removeEventListener("resize", handleResize)
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current)
      }
    }
  }, [handleResize])

  useEffect(() => {
    if (typeof window !== "undefined" && mapRef.current && !mapInstance) {
      const initMap = async () => {
        try {
          const southWest = L.latLng(48.0, 10.0)
          const northEast = L.latLng(61.0, 40.0)
          const bounds = L.latLngBounds(southWest, northEast)

          const container = mapRef.current!
          if (container.offsetWidth === 0 || container.offsetHeight === 0) {
            setTimeout(() => initMap(), 100)
            return
          }

          const map = L.map(container, {
            center: [53.0, 25.0],
            zoom: 5,
            minZoom: 4,
            maxZoom: 8,
            zoomControl: false,
            attributionControl: false,
            dragging: true,
            scrollWheelZoom: true,
            maxBounds: bounds,
            maxBoundsViscosity: 1.0,
            trackResize: true,
            worldCopyJump: false,
          })

          map.fitBounds(bounds, { padding: [20, 20], animate: false })

          L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png", {
            attribution: "",
            subdomains: "abcd",
            maxZoom: 19,
          }).addTo(map)

          map.whenReady(() => {
            setTimeout(() => {
              try {
                map.invalidateSize({ animate: false, pan: false })
              } catch (error) {}
            }, 100)
          })

          const kievCapital = europeanCapitals.find((c) => c.isOrigin)!
          const markerElement = document.createElement("div")
          markerElement.className = "custom-marker origin-marker"
          markerElement.innerHTML = `
            <div class="marker-pin origin-pin">
              <div class="marker-flag">${kievCapital.flag}</div>
            </div>
            <div class="marker-shadow"></div>
          `

          const kievMarker = L.marker([kievCapital.lat, kievCapital.lng], {
            icon: L.divIcon({
              html: markerElement.outerHTML,
              className: "custom-div-icon",
              iconSize: [40, 50],
              iconAnchor: [20, 50],
              popupAnchor: [0, -50],
            }),
          }).addTo(map)

          kievMarker.bindPopup(
            `
            <div class="text-center p-3 bg-black/60 backdrop-blur-sm rounded-lg border border-amber-400/30">
              <div class="font-medium text-amber-400 mb-1">${kievCapital.name}</div>
              <div class="text-xs text-amber-300">Точка отправления</div>
            </div>
          `,
            {
              closeButton: false,
              className: "custom-popup",
            },
          )

          setVisibleMarkers([kievMarker])
          setMapInstance(map)
        } catch (error) {
          console.error("Map initialization error:", error)
        }
      }

      initMap()
    }
  }, [mapInstance])

  const updateVisibleMarkers = (countryGroup: string) => {
    if (!mapInstance) return

    visibleMarkers.forEach((marker) => {
      if (marker !== visibleMarkers[0]) {
        mapInstance.removeLayer(marker)
      }
    })

    addCountryBorders(mapInstance, countryGroup)

    const newMarkers = [visibleMarkers[0]]

    if (countryGroup !== "all") {
      const group = countryGroups.find((g) => g.id === countryGroup)
      if (group) {
        group.countries.forEach((countryId) => {
          const route = routes.find((r) => r.id === countryId)
          if (route) {
            const destinationCoord = route.coordinates[route.coordinates.length - 1]
            const capital = europeanCapitals.find(
              (c) => Math.abs(c.lat - destinationCoord.lat) < 0.1 && Math.abs(c.lng - destinationCoord.lng) < 0.1,
            )

            if (capital && !capital.isOrigin) {
              const markerElement = document.createElement("div")
              markerElement.className = "custom-marker destination-marker"
              markerElement.innerHTML = `
                <div class="marker-pin emerald-pin ${animatingMarkers.has(capital.name) ? "animate-color-change" : ""}">
                  <div class="marker-flag">${capital.flag}</div>
                  <div class="emerald-glow"></div>
                </div>
                <div class="marker-shadow"></div>
              `

              const marker = L.marker([capital.lat, capital.lng], {
                icon: L.divIcon({
                  html: markerElement.outerHTML,
                  className: "custom-div-icon",
                  iconSize: [40, 50],
                  iconAnchor: [20, 50],
                }),
              }).addTo(mapInstance)

              marker.on("click", () => {
                animateMarkerClick(capital.name, marker)
                showFullRoute(route.id, mapInstance)
              })

              newMarkers.push(marker)
            }
          }
        })
      }
    } else {
      routes.forEach((route) => {
        const destinationCoord = route.coordinates[route.coordinates.length - 1]
        const capital = europeanCapitals.find(
          (c) => Math.abs(c.lat - destinationCoord.lat) < 0.1 && Math.abs(c.lng - destinationCoord.lng) < 0.1,
        )

        if (capital && !capital.isOrigin) {
          const markerElement = document.createElement("div")
          markerElement.className = "custom-marker destination-marker"
          markerElement.innerHTML = `
            <div class="marker-pin emerald-pin ${animatingMarkers.has(capital.name) ? "animate-color-change" : ""}">
              <div class="marker-flag">${capital.flag}</div>
              <div class="emerald-glow"></div>
            </div>
            <div class="marker-shadow"></div>
          `

          const marker = L.marker([capital.lat, capital.lng], {
            icon: L.divIcon({
              html: markerElement.outerHTML,
              className: "custom-div-icon",
              iconSize: [40, 50],
              iconAnchor: [20, 50],
            }),
          }).addTo(mapInstance)

          marker.on("click", () => {
            animateMarkerClick(capital.name, marker)
            showFullRoute(route.id, mapInstance)
          })

          newMarkers.push(marker)
        }
      })
    }

    setVisibleMarkers(newMarkers)
  }

  const addCountryBorders = (map: any, countryGroup: string) => {
    // Удаляем существующие контуры
    countryLayers.forEach((layer) => map.removeLayer(layer))

    const newLayers: any[] = []

    const ourCountries = ["germany", "poland", "lithuania", "latvia", "estonia", "belarus", "russia"]

    if (countryGroup !== "all") {
      const group = countryGroups.find((g) => g.id === countryGroup)
      if (group) {
        group.countries.forEach((countryId) => {
          const border = countryBorders[countryId as keyof typeof countryBorders]
          if (border) {
            const layer = L.geoJSON(border, {
              style: {
                color: "#10b981",
                weight: 3,
                opacity: 0.9,
                fillColor: "transparent",
                fillOpacity: 0,
                // Убираем пунктир для сплошной линии
              },
            }).addTo(map)
            newLayers.push(layer)
          }
        })
      }
    } else {
      ourCountries.forEach((countryId) => {
        const border = countryBorders[countryId as keyof typeof countryBorders]
        if (border) {
          const layer = L.geoJSON(border, {
            style: {
              color: "#10b981",
              weight: 3,
              opacity: 0.9,
              fillColor: "transparent",
              fillOpacity: 0,
              // Сплошная линия без пунктира
            },
          }).addTo(map)
          newLayers.push(layer)
        }
      })
    }

    setCountryLayers(newLayers)
  }

  const animateMarkerClick = (cityName: string, marker: any) => {
    setAnimatingMarkers((prev) => new Set(prev).add(cityName))

    const capital = europeanCapitals.find((c) => c.name === cityName)
    if (capital) {
      const redMarkerElement = document.createElement("div")
      redMarkerElement.className = "custom-marker destination-marker"
      redMarkerElement.innerHTML = `
        <div class="marker-pin red-pin">
          <div class="marker-flag">${capital.flag}</div>
          <div class="red-glow"></div>
        </div>
        <div class="marker-shadow"></div>
      `

      marker.setIcon(
        L.divIcon({
          html: redMarkerElement.outerHTML,
          className: "custom-div-icon",
          iconSize: [40, 50],
          iconAnchor: [20, 50],
        }),
      )

      setTimeout(() => {
        const greenMarkerElement = document.createElement("div")
        greenMarkerElement.className = "custom-marker destination-marker"
        greenMarkerElement.innerHTML = `
          <div class="marker-pin emerald-pin">
            <div class="marker-flag">${capital.flag}</div>
            <div class="emerald-glow"></div>
          </div>
          <div class="marker-shadow"></div>
        `

        marker.setIcon(
          L.divIcon({
            html: greenMarkerElement.outerHTML,
            className: "custom-div-icon",
            iconSize: [40, 50],
            iconAnchor: [20, 50],
          }),
        )

        setAnimatingMarkers((prev) => {
          const newSet = new Set(prev)
          newSet.delete(cityName)
          return newSet
        })
      }, 2000)
    }
  }

  const showFullRoute = (routeId: string, map: any) => {
    routeMarkers.forEach((marker) => map.removeLayer(marker))
    routePolylines.forEach((polyline) => map.removeLayer(polyline))

    const route = routes.find((r) => r.id === routeId)
    if (!route) return

    setActiveRoute(activeRoute === routeId ? null : routeId)

    if (activeRoute === routeId) {
      setRouteMarkers([])
      setRoutePolylines([])
      return
    }

    const newMarkers: any[] = []
    const newPolylines: any[] = []

    route.coordinates.forEach((coord, index) => {
      const city = europeanCapitals.find((c) => Math.abs(c.lat - coord.lat) < 0.1 && Math.abs(c.lng - coord.lng) < 0.1)

      if (city) {
        const isTransfer = index > 0 && index < route.coordinates.length - 1
        const isDestination = index === route.coordinates.length - 1

        const routeMarkerElement = document.createElement("div")
        routeMarkerElement.className = `route-marker ${isDestination ? "destination" : isTransfer ? "transfer" : "origin"}`
        routeMarkerElement.innerHTML = `
          <div class="route-marker-pin ${isDestination ? "destination-pin" : isTransfer ? "transfer-pin" : "origin-pin"}">
            <div class="route-marker-flag">${city.flag}</div>
            <div class="route-marker-pulse"></div>
          </div>
          <div class="route-marker-shadow"></div>
        `

        const marker = L.marker([coord.lat, coord.lng], {
          icon: L.divIcon({
            html: routeMarkerElement.outerHTML,
            className: "custom-route-icon",
            iconSize: [50, 60],
            iconAnchor: [25, 60],
          }),
        }).addTo(map)

        marker.on("click", () => {
          animateRouteMarkerClick(city.name, marker, isDestination, isTransfer, city.flag)
        })

        newMarkers.push(marker)
      }
    })

    const polyline = L.polyline(
      route.coordinates.map((coord) => [coord.lat, coord.lng]),
      {
        color: "#10b981",
        weight: 4,
        opacity: 0.9,
        dashArray: "10, 5",
        className: "animate-pulse",
      },
    ).addTo(map)

    newPolylines.push(polyline)

    let busProgress = 0
    const animateBus = () => {
      if (busProgress <= 100) {
        const totalDistance = route.coordinates.length - 1
        const currentSegment = Math.floor((busProgress / 100) * totalDistance)
        const segmentProgress = ((busProgress / 100) * totalDistance) % 1

        if (currentSegment < route.coordinates.length - 1) {
          const start = route.coordinates[currentSegment]
          const end = route.coordinates[currentSegment + 1]

          const lat = start.lat + (end.lat - start.lat) * segmentProgress
          const lng = start.lng + (end.lng - start.lng) * segmentProgress

          const busMarker = L.circleMarker([lat, lng], {
            radius: 8,
            fillColor: "#3b82f6",
            color: "#1d4ed8",
            weight: 2,
            opacity: 1,
            fillOpacity: 1,
          }).addTo(map)

          busMarker.bindPopup(`
            <div class="text-center p-2 bg-black/40 backdrop-blur-sm rounded border border-blue-400/20">
              <div class="font-medium text-blue-400 text-sm">В пути</div>
              <div class="text-xs text-gray-400">${Math.round(busProgress)}%</div>
            </div>
          `)

          setTimeout(() => map.removeLayer(busMarker), 200)
        }

        busProgress += 2
        setTimeout(animateBus, 100)
      }
    }

    setTimeout(animateBus, 1000)

    setRouteMarkers(newMarkers)
    setRoutePolylines(newPolylines)

    const bounds = L.latLngBounds(route.coordinates.map((coord) => [coord.lat, coord.lng]))
    map.fitBounds(bounds, { padding: [50, 50] })
  }

  const animateRouteMarkerClick = (
    cityName: string,
    marker: any,
    isDestination: boolean,
    isTransfer: boolean,
    flag: string,
  ) => {
    setAnimatingMarkers((prev) => new Set(prev).add(cityName))

    // Красный маркер
    const redMarkerElement = document.createElement("div")
    redMarkerElement.className = `route-marker ${isDestination ? "destination" : isTransfer ? "transfer" : "origin"}`
    redMarkerElement.innerHTML = `
      <div class="route-marker-pin red-route-pin">
        <div class="route-marker-flag">${flag}</div>
        <div class="red-route-glow"></div>
      </div>
      <div class="route-marker-shadow"></div>
    `

    marker.setIcon(
      L.divIcon({
        html: redMarkerElement.outerHTML,
        className: "custom-route-icon",
        iconSize: [50, 60],
        iconAnchor: [25, 60],
      }),
    )

    setTimeout(() => {
      // Возвращаем исходный цвет
      const originalMarkerElement = document.createElement("div")
      originalMarkerElement.className = `route-marker ${isDestination ? "destination" : isTransfer ? "transfer" : "origin"}`
      originalMarkerElement.innerHTML = `
        <div class="route-marker-pin ${isDestination ? "destination-pin" : isTransfer ? "transfer-pin" : "origin-pin"}">
          <div class="route-marker-flag">${flag}</div>
          <div class="route-marker-pulse"></div>
        </div>
        <div class="route-marker-shadow"></div>
      `

      marker.setIcon(
        L.divIcon({
          html: originalMarkerElement.outerHTML,
          className: "custom-route-icon",
          iconSize: [50, 60],
          iconAnchor: [25, 60],
        }),
      )

      setAnimatingMarkers((prev) => {
        const newSet = new Set(prev)
        newSet.delete(cityName)
        return newSet
      })
    }, 2000)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 15,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 15,
    })
  }

  const getFilteredRoutes = () => {
    if (selectedCountryGroup === "all") return routes
    const group = countryGroups.find((g) => g.id === selectedCountryGroup)
    return group ? routes.filter((r) => group.countries.includes(r.id)) : []
  }

  return (
    <>
      <style jsx global>{`
        .custom-marker {
          position: relative;
          animation: markerBounce 2s ease-in-out infinite;
        }

        .marker-pin {
          width: 30px;
          height: 40px;
          border-radius: 50% 50% 50% 0;
          position: relative;
          transform: rotate(-45deg);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 20px rgba(0,0,0,0.3);
          transition: all 0.3s ease;
        }

        .origin-pin {
          background: linear-gradient(135deg, #fbbf24, #f59e0b);
          border: 3px solid #f59e0b;
          box-shadow: 0 0 20px rgba(251, 191, 36, 0.5);
        }

        .emerald-pin {
          background: linear-gradient(135deg, #10b981, #059669);
          border: 3px solid #059669;
          box-shadow: 0 0 25px rgba(16, 185, 129, 0.6);
          position: relative;
        }

        .red-pin {
          background: linear-gradient(135deg, #ef4444, #dc2626);
          border: 3px solid #dc2626;
          box-shadow: 0 0 25px rgba(239, 68, 68, 0.6);
          position: relative;
        }

        .red-glow {
          position: absolute;
          top: -5px;
          left: -5px;
          right: -5px;
          bottom: -5px;
          border-radius: 50% 50% 50% 0;
          background: linear-gradient(135deg, rgba(239, 68, 68, 0.3), rgba(220, 38, 38, 0.3));
          animation: redPulse 2s ease-in-out infinite;
          z-index: -1;
        }

        .emerald-glow {
          position: absolute;
          top: -5px;
          left: -5px;
          right: -5px;
          bottom: -5px;
          border-radius: 50% 50% 50% 0;
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.3), rgba(5, 150, 105, 0.3));
          animation: emeraldPulse 2s ease-in-out infinite;
          z-index: -1;
        }

        .marker-flag {
          transform: rotate(45deg);
          font-size: 16px;
          animation: flagWave 3s ease-in-out infinite;
        }

        .marker-shadow {
          width: 20px;
          height: 10px;
          background: rgba(0,0,0,0.3);
          border-radius: 50%;
          position: absolute;
          bottom: -5px;
          left: 50%;
          transform: translateX(-50%);
          animation: shadowPulse 2s ease-in-out infinite;
        }

        .route-marker {
          position: relative;
          animation: routeMarkerPulse 1.5s ease-in-out infinite;
        }

        .route-marker-pin {
          width: 40px;
          height: 50px;
          border-radius: 50% 50% 50% 0;
          position: relative;
          transform: rotate(-45deg);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 25px rgba(0,0,0,0.4);
        }

        .destination-pin {
          background: linear-gradient(135deg, #10b981, #059669);
          border: 4px solid #059669;
          box-shadow: 0 0 25px rgba(16, 185, 129, 0.6);
        }

        .transfer-pin {
          background: linear-gradient(135deg, #f59e0b, #d97706);
          border: 4px solid #d97706;
          box-shadow: 0 0 25px rgba(245, 158, 11, 0.6);
        }

        .origin-pin {
          background: linear-gradient(135deg, #fbbf24, #f59e0b);
          border: 4px solid #f59e0b;
          box-shadow: 0 0 25px rgba(251, 191, 36, 0.6);
        }

        .route-marker-flag {
          transform: rotate(45deg);
          font-size: 18px;
          z-index: 2;
        }

        .route-marker-pulse {
          position: absolute;
          top: -5px;
          left: -5px;
          right: -5px;
          bottom: -5px;
          border-radius: 50% 50% 50% 0;
          border: 2px solid rgba(16, 185, 129, 0.6);
          animation: pulseRing 2s ease-out infinite;
        }

        .route-marker-shadow {
          width: 25px;
          height: 12px;
          background: rgba(0,0,0,0.4);
          border-radius: 50%;
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
        }

        .custom-popup .leaflet-popup-content-wrapper {
          background: transparent !important;
          box-shadow: none !important;
          border-radius: 12px !important;
        }

        .custom-popup .leaflet-popup-tip {
          background: rgba(26, 26, 26, 0.9) !important;
          border: none !important;
        }

        @keyframes emeraldPulse {
          0%, 100% { 
            opacity: 0.6; 
            transform: rotate(-45deg) scale(1); 
          }
          50% { 
            opacity: 1; 
            transform: rotate(-45deg) scale(1.1); 
          }
        }

        @keyframes markerBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes flagWave {
          0%, 100% { transform: rotate(45deg) scale(1); }
          50% { transform: rotate(45deg) scale(1.1); }
        }

        @keyframes shadowPulse {
          0%, 100% { opacity: 0.3; transform: translateX(-50%) scale(1); }
          50% { opacity: 0.6; transform: translateX(-50%) scale(1.2); }
        }

        @keyframes routeMarkerPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        @keyframes pulseRing {
          0% { transform: rotate(-45deg) scale(0.8); opacity: 1; }
          100% { transform: rotate(-45deg) scale(1.4); opacity: 0; }
        }

        @keyframes redPulse {
          0%, 100% { 
            opacity: 0.6; 
            transform: rotate(-45deg) scale(1); 
          }
          50% { 
            opacity: 1; 
            transform: rotate(-45deg) scale(1.1); 
          }
        }

        .red-route-pin {
          background: linear-gradient(135deg, #ef4444, #dc2626);
          border: 4px solid #dc2626;
          box-shadow: 0 0 25px rgba(239, 68, 68, 0.6);
          position: relative;
        }

        .red-route-glow {
          position: absolute;
          top: -5px;
          left: -5px;
          right: -5px;
          bottom: -5px;
          border-radius: 50% 50% 50% 0;
          background: linear-gradient(135deg, rgba(239, 68, 68, 0.3), rgba(220, 38, 38, 0.3));
          animation: redPulse 2s ease-in-out infinite;
          z-index: -1;
        }

        /* Добавил медиа-запросы для скрытия флагов на мобильных устройствах */
        @media (max-width: 768px) {
          .marker-flag,
          .route-marker-flag {
            display: none;
          }
          
          .marker-pin,
          .route-marker-pin {
            width: 25px;
            height: 35px;
          }
          
          .custom-marker,
          .route-marker {
            transform: scale(0.8);
          }
        }
      `}</style>

      <div
        className="relative w-full mx-auto bg-transparent rounded-3xl overflow-hidden transform-3d transition-transform duration-300"
        onMouseMove={handleMouseMove}
        style={{
          height: "min(90vh, 800px)", // Увеличено с 75vh и 650px
          minHeight: "550px", // Увеличено с 450px
          transform: `perspective(1200px) rotateX(${mousePosition.y * 0.1}deg) rotateY(${mousePosition.x * 0.1}deg)`,
          background: "rgba(26, 26, 26, 0.3)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(16, 185, 129, 0.2)",
        }}
      >
        <div
          ref={mapRef}
          className="w-full h-full rounded-3xl"
          style={{
            filter: "hue-rotate(10deg) saturate(1.2) brightness(0.9)",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-accent/3 pointer-events-none rounded-3xl" />

        <div className="absolute top-4 left-4 z-10">
          <Select value={selectedCountryGroup} onValueChange={setSelectedCountryGroup}>
            <SelectTrigger className="w-48 sm:w-64 glass-card border-primary/20 neon-glow text-sm sm:text-base">
              <SelectValue placeholder="Выберите направление" />
            </SelectTrigger>
            <SelectContent className="glass-card border-primary/20">
              {countryGroups.map((group) => (
                <SelectItem key={group.id} value={group.id} className="hover:bg-primary/10 text-sm sm:text-base">
                  {group.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="absolute top-16 sm:top-20 left-4 sm:left-6 flex flex-wrap gap-1 sm:gap-2 max-w-xs">
          {getFilteredRoutes().map((route) => (
            <Button
              key={route.id}
              variant={activeRoute === route.id ? "default" : "outline"}
              size="sm"
              onClick={() => showFullRoute(route.id, mapInstance)}
              className={`text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2 transition-all duration-300 ${
                activeRoute === route.id
                  ? "neon-glow pulse-glow bg-gradient-to-r from-primary to-secondary"
                  : "hover:scale-105"
              }`}
            >
              {route.to}
            </Button>
          ))}
        </div>

        {activeRoute && (
          <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 holo-glass rounded-xl sm:rounded-2xl p-4 sm:p-6 transform transition-all duration-500 animate-in slide-in-from-bottom-4 transform-3d">
            {(() => {
              const route = routes.find((r) => r.id === activeRoute)!
              return (
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold kinetic-text font-space-grotesk">
                      {route.from} → {route.to}
                    </h3>
                    <p className="text-muted-foreground mt-1 text-sm sm:text-base">Время в пути: {route.duration}</p>
                  </div>
                  <div className="text-left sm:text-right w-full sm:w-auto">
                    <div className="text-base sm:text-lg font-bold text-primary mb-2">Индивидуальный расчет</div>
                    <Link
                      href={`/order?destination=${encodeURIComponent(route.to)}&from=${encodeURIComponent(route.from)}&duration=${encodeURIComponent(route.duration)}&routeId=${route.id}`}
                      className="w-full sm:w-auto"
                    >
                      <Button className="w-full sm:w-auto neon-glow pulse-glow hover:scale-105 transition-all duration-300 bg-gradient-to-r from-primary to-secondary text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3">
                        Забронировать
                      </Button>
                    </Link>
                  </div>
                </div>
              )
            })()}
          </div>
        )}
      </div>
    </>
  )
}
