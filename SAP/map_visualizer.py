import folium
import config

def render_multimodal_evacuation_map(selected_route_key=None, congestion_score=75.0):
    """
    Generate an interactive Folium Map visualizing 5 JNPA Port evacuation pathways:
    1. WDFC Rail Corridor (Green)
    2. Primary NH48 Road Freight (Red)
    3. Alternate Highway NH52 Road (Amber/Orange)
    4. Coastal Shipping Feeder (Blue)
    5. Express Air Cargo (Purple)
    """
    # Center map on Western India Logistics Corridor
    map_center = [23.5000, 74.5000]
    m = folium.Map(
        location=map_center,
        zoom_start=6,
        tiles="CartoDB positron",
        control_scale=True
    )

    # 1. JNPA Port Marker (Origin Hub)
    jnpa_coords = config.COORDINATES["JNPA_PORT"]
    jnpa_popup_html = f"""
    <div style="font-family: Arial, sans-serif; width: 230px;">
        <h4 style="margin: 0 0 6px 0; color: #0F172A; font-size: 14px;">🚢 JNPA Port Terminal (Navi Mumbai)</h4>
        <p style="margin: 2px 0; font-size: 11px; color: #475569;"><b>Capacity Status:</b> Landside Bottleneck Active</p>
        <p style="margin: 2px 0; font-size: 11px; color: #DC2626;"><b>Congestion Index:</b> {congestion_score:.1f} / 100</p>
        <p style="margin: 2px 0; font-size: 11px; color: #059669;"><b>SmartEvac:</b> 5 Evacuation Paths Evaluated</p>
    </div>
    """
    folium.Marker(
        location=jnpa_coords,
        popup=folium.Popup(jnpa_popup_html, max_width=250),
        tooltip="JNPA Port (Navi Mumbai)",
        icon=folium.Icon(color="darkblue", icon="ship", prefix="fa")
    ).add_to(m)

    # 2. Key Terminal Markers
    terminals = [
        ("ICD Dadri (WDFC Rail Hub)", config.COORDINATES["ICD_DADRI"], "green", "train"),
        ("Delhi NCR Logistics Park", config.COORDINATES["DELHI_NCR"], "red", "truck"),
        ("Port of Pipavav (Coastal Hub)", config.COORDINATES["PORT_PIPAVAV"], "blue", "anchor"),
        ("Indore Bypass Freight Station", config.COORDINATES["INDORE"], "orange", "road"),
        ("DEL Air Cargo Hub (Delhi)", config.COORDINATES["DEL_AIRPORT"], "purple", "plane")
    ]

    for name, coords, color, icon_name in terminals:
        folium.Marker(
            location=coords,
            popup=f"<b>{name}</b>",
            tooltip=name,
            icon=folium.Icon(color=color, icon=icon_name, prefix="fa")
        ).add_to(m)

    # 3. Draw All 5 Evacuation Pathways
    for key, rdata in config.ROUTES_DATA.items():
        is_selected = (key == selected_route_key)
        weight = 7 if is_selected else 4
        opacity = 1.0 if (selected_route_key is None or is_selected) else 0.45

        poly_tooltip = (
            f"<b>{rdata['name']}</b><br>"
            f"Mode: {rdata['mode']}<br>"
            f"Transit: {rdata['base_transit_hours']} hrs | Cost: ${rdata['base_cost_per_teu']}/TEU | CO2: {rdata['base_co2_kg_per_teu']} kg"
        )

        dash_array = None
        if key == "WDFC_RAIL":
            dash_array = "8, 6"
        elif key == "COASTAL_SHIPPING":
            dash_array = "4, 8"
        elif key == "AIR_CARGO":
            dash_array = "2, 6"

        folium.PolyLine(
            locations=rdata["waypoints"],
            color=rdata["color"],
            weight=weight,
            opacity=opacity,
            dash_array=dash_array,
            tooltip=poly_tooltip
        ).add_to(m)

    return m
