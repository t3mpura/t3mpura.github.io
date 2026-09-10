// footer year
document.getElementById("year").textContent = new Date().getFullYear();

document.querySelectorAll(".track-list li[data-thumbnail]").forEach((track) => {
	const thumbnailPath = track.dataset.thumbnail.trim();
	if (!thumbnailPath) return;

	const thumbnail = document.createElement("img");
	thumbnail.className = "track-thumb";
	thumbnail.src = thumbnailPath;
	thumbnail.alt = "";
	thumbnail.loading = "lazy";
	track.prepend(thumbnail);
});
