CREATE TABLE swanlinx_final AS
SELECT 
	hex.id AS id,
	sum(points.fruit_veg) / hex.pntcnt AS fruit_avg,
	sum(points.drink_ind) / hex.pntcnt AS fizzy_drinks,
	sum(points.sleep_time) / hex.pntcnt AS sleep_time,
	sum(points.fit_ind) / hex.pntcnt AS fitness,
	sum(points.health_ind) / hex.pntcnt AS health,
	sum(points.bleep_m) / hex.pntcnt AS bleep_male,
	sum(points.bleep_f) / hex.pntcnt AS bleep_female,
	sum(points.bmi_m) / hex.pntcnt AS bmi_male,
	sum(points.bmi_f) / hex.pntcnt AS bmi_female,
	sum(points.grip_m) / hex.pntcnt AS grip_male,
	sum(points.grip_f) / hex.pntcnt AS grip_female,
	hex.geom as geom
FROM points
JOIN hex
ON ST_Within(points.geom, hex.geom)
GROUP BY hex.pntcnt, hex.id, hex.geom;
 