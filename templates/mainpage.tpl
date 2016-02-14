<!--
<% for(var i = 1; i <= obj.blockFilmsCount; i++){ %>
	<div class="new-films-page" data-id="<%= i %>">
		<div class="new-photoblock">
			<div class="photoblock-parent">
				<div class="block-rating pageRating_animation">
					<div class="roundRating">
                        <div class="actual-rating"><%= obj.blockFilms["film-"+i].rating %></div>
                        <div class="select-rating">
                            <% for (var j = 1; j < 11; j++) {%>
                                <span class="rating"><%= j %></span>
                            <% } %>
                            <span>
                        </div>
                    </div>
                    <div class="rating-ico rating-top"></div>
					<div class="rating-ico rating-ico-left"></div>
					<div class="rating-ico rating-ico-right"></div>
					<div class="rating-scale" data-rating="<%= obj.blockFilms["film-"+i].rating %>">
                        <div class="star1 pageRating-new-width">
                            <div class="star2"></div>
                        </div>
					</div>
				</div>
				<div class="block-picture">
					<img src="..<%= obj.blockFilms["film-"+i].src_small %>"/>
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