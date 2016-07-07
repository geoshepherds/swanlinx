CREATE TABLE hex_count AS
SELECT 
	hex.gid AS gid,
	bleep_f_count.count AS bleep_f_count,
	bleep_m_count.count AS bleep_m_count,
	bmi_f_count.count AS bmi_f_count,
	bmi_m_count.count AS bmi_m_count,
	drink_ind_count.count AS drink_count,
	fit_ind_count.count AS fit_count,
	fruit_veg_count.count AS fruit_count,
	grip_f_count.count AS grip_f_count,
	grip_m_count.count AS grip_m_count,
	health_ind_count.count AS health_count,
	sleep_time_count.count AS sleep_count,
	hex.geom AS geom
FROM hex
JOIN bleep_f_count 
ON hex.gid = bleep_f_count.gid
JOIN bleep_m_count 
ON hex.gid = bleep_m_count.gid
JOIN bmi_f_count 
ON hex.gid = bmi_f_count.gid
JOIN bmi_m_count 
ON hex.gid = bmi_m_count.gid
JOIN drink_ind_count 
ON hex.gid = drink_ind_count.gid
JOIN fit_ind_count 
ON hex.gid = fit_ind_count.gid
JOIN fruit_veg_count 
ON hex.gid = fruit_veg_count.gid
JOIN grip_f_count 
ON hex.gid = grip_f_count.gid
JOIN grip_m_count 
ON hex.gid = grip_m_count.gid
JOIN health_ind_count 
ON hex.gid = health_ind_count.gid
JOIN sleep_time_count 
ON hex.gid = sleep_time_count.gid
