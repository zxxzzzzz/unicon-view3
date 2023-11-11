import cytoscape from 'cytoscape';
import Popper from 'cytoscape-popper';
import Pop from './pop.vue';
import { render } from 'vue';

export const initLink = (cy: cytoscape.Core) => {
  // example code for making your own handles -- customise events and presentation where fitting
  // var popper;
  let eh = cy.edgehandles();
  var popperNode: cytoscape.NodeSingular | null;
  var popper: ReturnType<Popper.getPopperInstance<HTMLDivElement>> | null;
  var popperDiv: HTMLDivElement | null;
  var started = false;

  function start() {
    // @ts-ignore
    eh.start(popperNode);
  }

  function stop() {
    eh.stop();
  }

  function setHandleOn(node: cytoscape.NodeSingular) {
    if (started) {
      return;
    }

    removeHandle(); // rm old handle

    popperNode = node;
    popper = node.popper({
      content: () => {
        const _popperDiv = document.createElement('div');
        popperDiv = _popperDiv;
        popperDiv.classList.add('popper-handle');
        popperDiv.addEventListener('mousedown', start);
        document.body.appendChild(popperDiv);
        return _popperDiv;
      },
      popper: {
        strategy: 'absolute',
        placement: 'top',
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, -10],
            },
          },
        ],
      },
    });
  }

  function removeHandle() {
    if (popper) {
      popper.destroy();
      popper = null;
    }

    if (popperDiv) {
      document.body.removeChild(popperDiv);
      popperDiv = null;
    }

    popperNode = null;
  }

  cy.on('mouseover', 'node', function (e) {
    setHandleOn(e.target);
  });

  cy.on('grab', 'node', function () {
    removeHandle();
  });

  cy.on('tap', function (e) {
    if (e.target === cy) {
      removeHandle();
    }
  });

  cy.on('zoom pan', function () {
    removeHandle();
  });
  cy.on('remove', 'node', function () {
    removeHandle();
  });
  window.addEventListener('mouseup', function (e) {
    stop();
  });

  cy.on('ehstart', function () {
    started = true;
  });

  cy.on('ehstop', function () {
    started = false;
  });
  return removeHandle;
};

export const initEdgeDelete = (cy: cytoscape.Core) => {
  var popper: ReturnType<Popper.getPopperInstance<HTMLDivElement>> | null;
  var popperDiv: HTMLDivElement | null;

  function setHandleOn(node: cytoscape.NodeSingular) {
    removeHandle(); // rm old handle
    popper = node.popper({
      content: () => {
        const _popperDiv = document.createElement('div');
        popperDiv = _popperDiv;
        popperDiv.classList.add('bg-white');
        popperDiv.style.boxShadow = '0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)';
        popperDiv.style.borderRadius = '8px';
        const deleteDom = document.createElement('div');
        deleteDom.innerHTML = '删除';
        deleteDom.classList.add('w-5rem', 'py-1', 'px-2');
        deleteDom.addEventListener('click', () => {
          removeHandle();
          node.remove();
        });
        const arrow = document.createElement('div');
        arrow.style.backgroundColor = 'white';
        arrow.style.width = '1rem';
        arrow.style.height = '0.6rem';
        arrow.style.clipPath = 'polygon(0 0, 0% 100%, 100% 50%)';
        arrow.style.position = 'absolute';
        arrow.style.right = '-0.8rem';
        arrow.style.top = '0.4rem';
        popperDiv.appendChild(arrow);
        popperDiv.append(deleteDom);
        document.body.appendChild(popperDiv);
        return _popperDiv;
      },
      popper: {
        strategy: 'absolute',
        placement: 'top',
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [-60, -20],
            },
          },
        ],
      },
    });
  }

  function removeHandle() {
    if (popper) {
      popper.destroy();
      popper = null;
    }
    if (popperDiv) {
      document.body.removeChild(popperDiv);
      popperDiv = null;
    }
  }

  cy.on('select', 'edge', function (e) {
    setHandleOn(e.target);
  });
  cy.on('unselect', 'edge', function (e) {
    removeHandle();
  });

  cy.on('grab', 'node', function () {
    removeHandle();
  });

  cy.on('tap', function (e) {
    if (e.target === cy) {
      removeHandle();
    }
  });

  cy.on('zoom pan', function () {
    removeHandle();
  });

  window.addEventListener('mouseup', function (e) {
    stop();
  });
  return removeHandle;
};

export const initNodeDelete = (cy: cytoscape.Core) => {
  var popper: ReturnType<Popper.getPopperInstance<HTMLDivElement>> | null;
  var popperDiv: HTMLDivElement | null;

  function setHandleOn(node: cytoscape.NodeSingular) {
    removeHandle(); // rm old handle
    popper = node.popper({
      content: () => {
        const _popperDiv = document.createElement('div');
        render(
          h(Pop, {
            onDelete() {
              removeHandle();
              node.emit('delete')
            },
            onConfig() {
              removeHandle();
              node.emit('config')
            },
          }),
          _popperDiv,
        );
        popperDiv = _popperDiv;
        document.body.appendChild(popperDiv);
        return _popperDiv;
      },
      popper: {
        strategy: 'absolute',
        placement: 'top',
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [80, -50],
            },
          },
        ],
      },
    });
  }

  function removeHandle() {
    if (popper) {
      popper.destroy();
      popper = null;
    }
    if (popperDiv) {
      document.body.removeChild(popperDiv);
      popperDiv = null;
    }
  }

  cy.on('cxttap', 'node', function (e) {
    setHandleOn(e.target);
  });
  cy.on('unselect', 'node', function (e) {
    removeHandle();
  });

  cy.on('grab', 'node', function () {
    removeHandle();
  });

  cy.on('tap', function (e) {
    if (e.target === cy) {
      removeHandle();
    }
  });

  cy.on('zoom pan', function () {
    removeHandle();
  });

  window.addEventListener('mouseup', function (e) {
    stop();
  });
  return removeHandle;
};
