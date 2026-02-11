import { MapPin, Phone, Star, Navigation } from "lucide-react";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import type { LatLngExpression } from "leaflet";

import PatientLayout from "@/components/layouts/PatientLayout";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { mockClinics } from "@/data/mockData";
import { cn } from "@/lib/utils";

const NearbyClinics = () => {
  // 📍 USER LOCATION
  const [userLocation, setUserLocation] =
    useState<[number, number] | null>(null);

  // 🌍 REAL CLINICS FROM OSM
  const [nearbyClinics, setNearbyClinics] = useState<any[]>([]);
  const [loadingClinics, setLoadingClinics] = useState(false);

  // 🌐 FETCH REAL CLINICS
  const fetchNearbyClinics = async (lat: number, lng: number) => {
    setLoadingClinics(true);

    const query = `
      [out:json];
      (
        node["amenity"="hospital"](around:5000, ${lat}, ${lng});
        node["amenity"="clinic"](around:5000, ${lat}, ${lng});
        node["amenity"="doctors"](around:5000, ${lat}, ${lng});
      );
      out body;
    `;

    try {
      const res = await fetch(
        "https://overpass-api.de/api/interpreter",
        {
          method: "POST",
          body: query,
        }
      );

      const data = await res.json();
      setNearbyClinics(data.elements.slice(0, 3)); // only 3
    } catch (err) {
      console.error("Failed to fetch nearby clinics", err);
    } finally {
      setLoadingClinics(false);
    }
  };

  // 📍 GET LOCATION ONCE
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        setUserLocation([lat, lng]);
        fetchNearbyClinics(lat, lng);
      },
      () => {
        console.log("Location access denied");
      }
    );
  }, []);

  // 🧠 SINGLE SOURCE OF TRUTH
  const clinicsToShow =
    nearbyClinics.length > 0 ? nearbyClinics : mockClinics;

  // 🗺️ SAFE MAP CENTER
  const mapCenter: LatLngExpression =
    userLocation ?? [19.076, 72.8777];

  return (
    <PatientLayout>
      <Breadcrumbs />

      <div className="
  bg-primary/30
  m-4 md:m-6 lg:m-10
  p-6 md:p-8 lg:p-10
  rounded-[2.5rem]
  min-h-[calc(100%-4rem)]
">

        {/* Header */}
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-secondary">
            Nearby Clinics
          </h1>
          <p className="text-muted-foreground mt-1">
            Find healthcare facilities near you
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* ---------------- CLINIC LIST ---------------- */}
          <div className="space-y-4">
            {loadingClinics && (
              <p className="text-muted-foreground">
                Finding nearby clinics…
              </p>
            )}

            {clinicsToShow.map((clinic: any) => {
              const lat = clinic.lat ?? clinic.lat;
              const lng = clinic.lon ?? clinic.lng;

              return (
                <div
                  key={clinic.id}
                  className="bg-card rounded-xl shadow-card border p-6"
                >
                  <h3 className="font-semibold text-secondary">
                    {clinic.tags?.name || clinic.name || "Nearby Clinic"}
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    {clinic.tags?.amenity || clinic.specialty || "Clinic"}
                  </p>

                  <div className="flex gap-3 mt-4">
                    <Button size="sm" className="flex-1">
                      <Phone className="h-4 w-4 mr-2" />
                      Call
                    </Button>

                    {lat && lng && (
                      <Button
                        size="sm"
                        className="flex-1"
                        onClick={() =>
                          window.open(
                            `https://www.openstreetmap.org/directions?to=${lat},${lng}`,
                            "_blank"
                          )
                        }
                      >
                        <MapPin className="h-4 w-4 mr-2" />
                        Get Directions
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* ---------------- MAP VIEW ---------------- */}
          <div className="bg-card rounded-xl shadow-card border overflow-hidden h-[600px] sticky top-24">
            <MapContainer
              center={mapCenter}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />

              {/* USER */}
              <Marker position={mapCenter}>
                <Popup>You are here</Popup>
              </Marker>

              {/* CLINICS */}
              {clinicsToShow.map((clinic: any) => {
                const lat = clinic.lat ?? clinic.lat;
                const lng = clinic.lon ?? clinic.lng;

                if (!lat || !lng) return null;

                return (
                  <Marker key={clinic.id} position={[lat, lng]}>
                    <Popup>
                      <strong>
                        {clinic.tags?.name || clinic.name || "Clinic"}
                      </strong>
                    </Popup>
                  </Marker>
                );
              })}
            </MapContainer>
          </div>
        </div>
      </div>
    </PatientLayout>
  );
};

export default NearbyClinics;
