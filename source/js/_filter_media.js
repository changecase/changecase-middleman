(function (media) {
  var projects, filterThisProject, activeFilters;

  activeFilters = [];

  // when a media filter button is clicked
  $('.filter-form input[type="button"]')
    .on( 'click', function(){
      var clickedBtn;

      clickedBtn = this;

      media.filterThisProject(clickedBtn);
    });

  var removeFilter = function(array, filter) {
    var index = array.indexOf(filter);
    array.splice(index, 1);
  };

  media.filterThisProject = function(clickedBtn) {
    var filter, projects, filteredProjects, selectedProjects;

    filter = $(clickedBtn).val().toLowerCase();
    projects = $('.p_item');
    filteredProjects = projects.not('.' + filter);
    selectedProjects = projects.filter('.' + filter);

    //console.log('The filter: ' + filter);
    //console.log('\nThe projects');
    //console.log(projects);
    //console.log('\nThe filteredProjects');
    //console.log(filteredProjects);
    //console.log('\nThe selectedProjects');
    //console.log(selectedProjects);
    //console.log('\nThe active filters');
    //console.log(activeFilters);


    // check to see if the media type has been filtered
      // if it has been filtered
    if ( activeFilters.indexOf(filter) > -1 ) {
      removeFilter(activeFilters, filter);
      for (i=0;i<selectedProjects.length;i++) {
        // unfilter the media
        selectedProjects.eq(i).appendTo('.main article');
        // remove the filtered class from the media button
        $(clickedBtn).removeClass('filtered');
      }
    } else {
      // if it has not been filtered
      activeFilters.push(filter);
      for (i=0;i<filteredProjects.length;i++) {
        // filter the media
        filteredProjects.eq(i).detach();
        // add the 'filtered' class to the media button
        $(clickedBtn).addClass('filtered');
      }
    }
  };
})(this.filterMedia = {});
