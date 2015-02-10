

  $('.section-content').mousedown(function(e){
    // the section we clicked on (this) is set to the variable 'item'
    var item = $(this);

    // item (the section we clicked on) has it's class set to 'selected-slide'
    item.addClass('selected-slide');

    // selectstart is when the user starts to select text
    // dragstart is when a drag is started
    // this is canceling the selection of text when a drag is started
    // due to the cancelTextSelection function below
    $(document).on('selectstart dragstart', cancelTextSelection);

    $('body').on('mouseup', doneReordering)

    $('body').on('mousemove', reorder)

    // preventDefault stops this from doing the event's default (in our case,
    // the text selection in the jquery function above).
    function cancelTextSelection(e) {
      e.preventDefault();
      return false;
    };

    function shouldMoveUp(y){
      var offset = item.prev().offset();

      return offset && offset.top > y;
    };

    function shouldMoveDown(y){
      var next = item.next();
      var offset = next.offset();

      return offset && offset.top + next.height() < y
    }

    function reorder(e){
      if (shouldMoveUp(e.pageY)) {
        item.insertBefore(item.prev());
      }
      else if (shouldMoveDown(e.pageY)) {
        item.insertAfter(item.next());
      }

      return false;
    }

    function doneReordering(){
      item.removeClass('selected-slide');
      $('body').off('mouseup', doneReordering);
      $('body').off('mousemove', reorder);
      $(document).off('selectstart dragstart', cancelTextSelection);
    }



  });
