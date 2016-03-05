<!--
<% for(var i = 1; i <= obj.blockFilmsCount; i++){ 
    item = obj.blockFilms["film-"+i]; %>
	<div class="new-films-page" data-id="<%= i %>" data-film-id="<%= item.arrAllBigPagesId %>">
		<div class="new-photoblock">
			<div class="photoblock-parent">
				<div class="block-rating pageRating_animation"><%= (parseFloat(item.rating)).toFixed(1) %></div>
				<div class="block-picture">
					<img src="..<%= item.src_small %>" component="pic3d"/>
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