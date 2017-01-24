import expect from 'unittest/helpers/expect.js';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Immutable from 'immutable';
import sinon from 'sinon';
import BrowserPage, * as uiElements from 'console/components/presentation/BrowserPage.js';

describe('BrowserPage', () => {
	let renderer, props, actions;
	beforeEach(() => {
		renderer = TestUtils.createRenderer();
		actions = {
			openNode: () => {},
			closeNode: () => {},
			loadChildren: () => () => () => {},
			selectNode: () => {}
		};
		props = {
			tree: Immutable.fromJS({
				name: 'testRoot',
				children: [
					{
						name: 'test1',
						label: 'Node 1',
						iconBase: 'test',
						open: true,
						childrenLoaded: true,
						children: [
							{
								name: 'test11',
								label: 'Subnode 1.1'
							}
						]
					},
					{
						name: 'test2',
						label: 'Node 2',
						iconBase: 'test',
						children: ['notloaded1', 'notloaded2']
					},
					{
						name: 'test3',
						label: 'Node 3',
						icon: 'test'
					}
				]
			}),
			selectedNode: 'test2',
			tabDef: Immutable.fromJS({
				provider: {
					protocol: 'wamp',
					uri: 'test.nothing'
				}
			}),
			splitPosition: 350,
			actions: {
				openNode: () => actions.openNode,
				closeNode: () => actions.closeNode,
				loadChildren: () => () => () => actions.loadChildren,
				selectNode: () => actions.selectNode
			}
		};
	});

	it('renders a browser', () => {
		renderer.render(<BrowserPage {...props}/>);
		return expect(renderer, 'to have rendered', (
			<uiElements.Browser splitPosition={350}>
				<uiElements.TreeNode key='test1' node={props.tree.getIn(['children', 0])} actions={props.actions}/>
				<uiElements.TreeNode key='test2' node={props.tree.getIn(['children', 1])} actions={props.actions}/>
				<uiElements.TreeNode key='test3' node={props.tree.getIn(['children', 2])} actions={props.actions}/>
			</uiElements.Browser>
		));
	});

	it('renders tree node with children', () => {
		renderer.render(<uiElements.TreeNode key='test1' node={props.tree.getIn(['children', 0])} actions={props.actions}/>);
		return expect(renderer, 'to have rendered', (
			<uiElements.Node>
				<uiElements.NodeOpen id='chevron-down'/>
				<uiElements.NodeLabel>
					<uiElements.NodeIcon id='test-open'/>
					<uiElements.NodeName>
						Node 1
					</uiElements.NodeName>
				</uiElements.NodeLabel>
				<uiElements.NodeGroup>
					<uiElements.TreeNode  key='test11' node={props.tree.getIn(['children', 0, 'children', 0])} actions={props.actions}/>
				</uiElements.NodeGroup>
			</uiElements.Node>
		));
	});

	it('renders closed tree node with unloaded children', () => {
		renderer.render(<uiElements.TreeNode key='test2' node={props.tree.getIn(['children', 1])} actions={props.actions}/>);
		return expect(renderer, 'to have rendered', (
			<uiElements.Node>
				<uiElements.NodeOpen id='chevron-right'/>
				<uiElements.NodeLabel>
					<uiElements.NodeIcon id='test-closed'/>
					<uiElements.NodeName>
						Node 2
					</uiElements.NodeName>
				</uiElements.NodeLabel>
			</uiElements.Node>
		));
	});

	it('renders leaf tree node', () => {
		renderer.render(<uiElements.TreeNode key='test3' node={props.tree.getIn(['children', 2])} actions={props.actions}/>);
		return expect(renderer, 'to have rendered', (
			<uiElements.Node>
				<uiElements.NodeLabel>
					<uiElements.NodeIcon id='test'/>
					<uiElements.NodeName>
						Node 3
					</uiElements.NodeName>
				</uiElements.NodeLabel>
			</uiElements.Node>
		));
	});

	it('renders leaf tree node without icon', () => {
		renderer.render(<uiElements.TreeNode  key='test11' node={props.tree.getIn(['children', 0, 'children', 0])} actions={props.actions}/>);
		return expect(renderer, 'to have rendered', (
			<uiElements.Node>
				<uiElements.NodeLabel>
					<uiElements.NodeIcon id='data-interface-closed'/>
					<uiElements.NodeName>
						Subnode 1.1
					</uiElements.NodeName>
				</uiElements.NodeLabel>
			</uiElements.Node>
		));
	});

	describe('node opener functions', () => {
		let getOpener = uiElements.getNodeOpenToggler, actions, node;
		beforeEach(() => {
			node = Immutable.fromJS({
				name: 'test',
				children: ['foo', 'bar']
			});
			actions = {
				openNode: sinon.spy().named('openNode'),
				closeNode: sinon.spy().named('closeNode'),
				loadChildren: sinon.spy().named('loadChildren')
			};
		});

		it('loads children if unloaded', () =>
			expect(getOpener, 'when called with', [node, actions], 'when called')
			.then(() => expect(actions.loadChildren, 'was called'))
		);

		it('opens node when loaded', () =>
			expect(getOpener, 'when called with', [node.set('childrenLoaded', true), actions], 'when called')
			.then(() => expect(actions.openNode, 'was called'))
		);

		it('closes open, loaded node', () =>
			expect(getOpener, 'when called with', [node.set('childrenLoaded', true).set('open', true), actions], 'when called')
			.then(() => expect(actions.closeNode, 'was called'))
		);
	});
});