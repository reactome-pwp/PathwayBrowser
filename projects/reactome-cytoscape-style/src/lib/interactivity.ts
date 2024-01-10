import cytoscape from "cytoscape";

export function initInteractivity(cy: cytoscape.Core) {
  cy.on('mouseover', e => {
    if (e.target.addClass) e.target.addClass('hover')
  });
  cy.on('mouseout', e => {
    if (e.target.removeClass) e.target?.removeClass('hover')
  });

  let selecting = false
  const selectReaction = (reactionNode: cytoscape.NodeCollection) => {
    if (selecting) return;
    selecting = true;
    const toSelect = reactionNode.connectedEdges().add(reactionNode);
    toSelect.select();
    selecting = false;
  };

  cy.edges()
    .on('select', event => selectReaction(event.target.connectedNodes('.reaction')))
    .on('unselect', event => selectReaction(
      cy.edges(':selected').connectedNodes('.reaction')
        .add(cy.nodes('.reaction:selected')))
    )
  cy.nodes('.reaction')
    .on('select', event => selectReaction(event.target))

  //todo: zoomLevel?
  cy.on('zoom', e => {
    const zoomLevel = cy.zoom();

    cy.edges('[?shadow]').stop().animate({
      style: {'underlay-opacity': zoomLevel > 0.4 ? 0 : 0.2}
    });

    cy.nodes('.Shadow').stop().animate({
      style: {'text-opacity': zoomLevel > 0.4 ? 0 : 1}
    });
  });

}
