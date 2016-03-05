<!--
<% for(var i = 1; i <= obj.blockFilmsCount; i++){ %>
	<div class="new-films-page" data-id="<%= i %>">
		<div class="new-photoblock">
			<div class="photoblock-parent">
				<div class="block-rating pageRating_animation"><%= (parseFloat(obj.blockFilms["film-"+i].rating)).toFixed(1) %></div>
				<div class="block-picture">
					<img src="..<%= obj.blockFilms["film-"+i].src_small %>" component="pic3d"/>
					<div class="button-play viewFilmButton button-film-action" action="play-film"></div>
					<div class="button-stop viewFilmButton button-film-action" action="stop-film"></div>
				</div>
				<div class="block-panel">
				</div>
			</div>
		</div>
	</div>
<% } %>
-->