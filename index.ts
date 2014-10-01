
/**
 * Sets the passed in `range` onto the given `selection`, removing
 * any previous selection.
 *
 * This method has an optional backwards parameter that native browser
 * Selection objects do not have. This parameter specifies whether the range
 * is to be selected "backwards" (i.e. from end to start).
 * Note that this parameter has no effect in Internet Explorer, which lacks
 * the ability to programmatically set the direction of a selection.
 *
 * @public
 */

function setRange (selection: Selection, range: Range, backwards: boolean = false): void {
  selection.removeAllRanges();

  if (backwards && 'function' === typeof (<any>selection).extend) {
    var end: Range = range.cloneRange();
    end.collapse(false); // collapse to end
    selection.addRange(end);

    // apparently `extend()` is not defined in TypeScript,
    // so we must cast to <any> :\
    (<any>selection).extend(range.startContainer, range.startOffset);
  } else {
    selection.addRange(range);
  }
}

export = setRange;
