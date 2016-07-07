
SELECT 
    hex.id AS id,
	sum(points.fruit_veg) / hex.fruit_count AS fruit_avg,
	sum(points.drink_ind)  / hex.drink_count AS drink_avg,
	sum(points.sleep_time) / hex.sleep_count AS sleep_avg,
	sum(points.fit_ind) / hex.fit_count AS fit_avg,
	sum(points.health_ind) / hex.health_count AS health_avg,
	sum(points.bleep_m) / hex.bleep_m_count AS bleep_m,
	sum(points.bleep_f) / hex.bleep_f_count AS bleep_f,
	sum(points.bmi_m) / hex.bmi_m_count AS bmi_m,
	sum(points.bmi_f) / hex.bmi_f_count AS bmi_f,
	sum(points.grip_m) / hex.grip_m_count AS grip_m,
	sum(points.grip_f) / hex.grip_f_count AS grip_f,
	hex.geom AS geom
FROM points
JOIN hex_count AS hex
ON ST_Within(points.geom, hex.geom)
GROUP BY hex.id, hex.fruit_count, hex.drink_count, hex.sleep_count, hex.fit_count, hex.health_count, hex.bleep_m_count, hex.bleep_f_count, hex.bmi_m_count, hex.bmi_f_count, hex.grip_m_count, hex.grip_f_count, hex.geom;
 