'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
	*
	*		RecipeBox App created using React, Bootstrap & ES6.
	*		Add and edit your favorite recipes. Your Recipe Box
	*		will save in your browser, so you can come back to
	*		use them whenever you want.
	*
	*/

/**
	*		Helper Functions
	*/

/**
	*		@desc Removes empty str els from array
	*		@param {Array} arr - an array of strings
	*		@returns {Array} with blank elements removed
	*/
function removeBlankElements(arr) {
	var tArr = arr.filter(function (el) {
		return el;
	});
	return tArr;
}

/**
	*		@desc Converts str to arr & trims whitespace
	*		@param {String} str -  ingredient list
	*		@returns {Array} trimmed ingredients
	*/
function ingredientsToArray(str) {
	var arr = removeBlankElements(str.split(','));
	arr.forEach(function (el, i) {
		arr[i] = el.trim();
	});
	return arr;
}

/**
	*		@desc Filters empty arr els & joins arr to str
	*		@param {Array} arr - ingredient list
	*		@returns {String} ingredient list for output
	*/
function ingredientsToString(arr) {
	var tArr = removeBlankElements(arr);
	return tArr.join(', ');
}

/**
	*		RecipeBox Components
	*/

/**
	*		@desc React Class rendered button that can cause parent to open dialog
	*		@param {RecipeBox~Callback} props.onClick - update parent dialog state
	*		@returns {HTML} render recipe button
	*/

var AddRecipeButton = function (_React$Component) {
	_inherits(AddRecipeButton, _React$Component);

	function AddRecipeButton(props) {
		_classCallCheck(this, AddRecipeButton);

		var _this = _possibleConstructorReturn(this, (AddRecipeButton.__proto__ || Object.getPrototypeOf(AddRecipeButton)).call(this, props));

		_this.handleClick = _this.handleClick.bind(_this);
		return _this;
	}

	_createClass(AddRecipeButton, [{
		key: 'handleClick',
		value: function handleClick() {
			this.props.onClick({ dialog: 'add',
				recipe: '',
				ingredients: '',
				index: undefined
			});
		}
	}, {
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				null,
				React.createElement(
					'button',
					{ className: 'add-btn btn btn-primary',
						type: 'button', onClick: this.handleClick },
					'Add Recipe'
				)
			);
		}
	}]);

	return AddRecipeButton;
}(React.Component);

/**
	*		@desc React Class rendered button updates parent state to open edit dialog
	*		@param {RecipeBox~Callback} props.onClick - update parent dialog state
	*		@param {String} props.recipe - name of this recipe
	*		@param {Array} props.ingredients - name of this ingredient list
	*		@param {Number} props.index - index of this recipe element
	*		@returns {HTML} edit recipe button
	*/


var EditRecipeButton = function (_React$Component2) {
	_inherits(EditRecipeButton, _React$Component2);

	function EditRecipeButton(props) {
		_classCallCheck(this, EditRecipeButton);

		var _this2 = _possibleConstructorReturn(this, (EditRecipeButton.__proto__ || Object.getPrototypeOf(EditRecipeButton)).call(this, props));

		_this2.handleClick = _this2.handleClick.bind(_this2);
		return _this2;
	}

	_createClass(EditRecipeButton, [{
		key: 'handleClick',
		value: function handleClick() {
			this.props.onClick({ dialog: 'edit',
				recipe: this.props.recipe,
				ingredients: this.props.ingredients,
				index: this.props.index
			});
		}
	}, {
		key: 'render',
		value: function render() {
			return React.createElement(
				'button',
				{ className: 'edit-btn btn btn-info',
					type: 'button', onClick: this.handleClick },
				'Edit'
			);
		}
	}]);

	return EditRecipeButton;
}(React.Component);

/**
	*		@desc React Class renders a recipe/ingredients element
	*		@param {RecipeBox~Callback} props.onClick - update parent dialog state
	*		@param {String} props.dialog - dialog box render state
	*		@param {String} props.recipe - name of this recipe
	*		@param {Array} props.ingredients - name of this ingredient list
	*		@param {RecipeBox~Callback} props.onSave - update parent state
	*		@param {RecipeBox~Callback} props.onCancel - update parent state
	*		@param {Number} props.index - index of this recipe element
	*		@returns {HTML} recipe row with nested ingredients
	*/


var RecipeRow = function (_React$Component3) {
	_inherits(RecipeRow, _React$Component3);

	function RecipeRow(props) {
		_classCallCheck(this, RecipeRow);

		var _this3 = _possibleConstructorReturn(this, (RecipeRow.__proto__ || Object.getPrototypeOf(RecipeRow)).call(this, props));

		_this3.handleDelete = _this3.handleDelete.bind(_this3);
		return _this3;
	}

	_createClass(RecipeRow, [{
		key: 'handleDelete',
		value: function handleDelete() {
			this.props.onDelete(this.props.index);
		}
	}, {
		key: 'render',
		value: function render() {
			var index = this.props.index;
			var collapseId = 'recipedetail' + index;
			var ingredients = this.props.ingredients.map(function (el) {
				return React.createElement(
					'div',
					{ className: 'ingredient' },
					el
				);
			});
			return React.createElement(
				'div',
				{ className: 'recipe-row' },
				React.createElement(
					'button',
					{ className: 'recipe-name', type: 'button', 'data-toggle': 'collapse',
						'data-target': ['#' + collapseId], 'aria-expanded': 'false',
						'aria-controls': collapseId },
					this.props.recipe
				),
				React.createElement(
					'div',
					{ id: collapseId, className: 'collapse recipe-details' },
					React.createElement(
						'div',
						{ className: 'ing-list' },
						ingredients
					),
					React.createElement(
						'div',
						{ className: 'recipe-btns' },
						React.createElement(EditRecipeButton, { onClick: this.props.onClick,
							dialog: this.props.dialog,
							recipe: this.props.recipe,
							ingredients: this.props.ingredients,
							onSave: this.props.onSave,
							onCancel: this.props.onCancel,
							onDelete: this.props.onDelete,
							index: this.props.index }),
						React.createElement(
							'button',
							{ className: 'delete-btn btn btn-danger',
								type: 'button', onClick: this.handleDelete },
							'Delete'
						)
					)
				)
			);
		}
	}]);

	return RecipeRow;
}(React.Component);

/**
	*		@desc React Class maps recipeBox and renders each el into a RecipeRow
	*		@param {RecipeBox~Callback} props.onClick - update parent dialog state
	*		@param {String} props.dialog - dialog box render state
	*		@param {Object} props.recipeBox - obj with recipe and ingredients els
	*		@param {RecipeBox~Callback} props.onSave - update parent state
	*		@param {RecipeBox~Callback} props.onCancel - update parent state
	*		@param {RecipeBox~Callback} props.onDelete - delete this el
	*		@param {Number} props.index - index of this recipe element
	*		@returns {HTML} recipe row with nested ingredients
	*/


var RecipeOutput = function (_React$Component4) {
	_inherits(RecipeOutput, _React$Component4);

	function RecipeOutput() {
		_classCallCheck(this, RecipeOutput);

		return _possibleConstructorReturn(this, (RecipeOutput.__proto__ || Object.getPrototypeOf(RecipeOutput)).apply(this, arguments));
	}

	_createClass(RecipeOutput, [{
		key: 'render',
		value: function render() {
			var _this5 = this;

			var recipeBox = this.props.recipeBox;
			var output = null;

			if (recipeBox.length > 0) {
				output = recipeBox.map(function (el, i) {
					return React.createElement(RecipeRow, { onClick: _this5.props.onClick,
						dialog: _this5.props.dialog,
						recipe: el.recipe,
						ingredients: el.ingredients,
						onSave: _this5.props.onSave,
						onCancel: _this5.props.onCancel,
						onDelete: _this5.props.onDelete,
						index: i });
				});
			} else {
				output = React.createElement(
					'div',
					{ className: 'empty-msg' },
					'Recipe box is empty'
				);
			}
			return React.createElement(
				'div',
				{ className: 'recipe-output' },
				output
			);
		}
	}]);

	return RecipeOutput;
}(React.Component);

/**
	*		@desc React Class renders add/edit/null recipe dialog depending in dialog prop
	*		@param {String} props.dialog - dialog box render state
	*		@param {String} props.recipe - name of this recipe
	*		@param {Array} props.ingredients - name of this ingredient list
	*		@param {RecipeBox~Callback} props.onChange - update parent & control form state
	*		@param {RecipeBox~Callback} props.onSave - update parent state
	*		@param {RecipeBox~Callback} props.onCancel - update parent state
	*		@returns {HTML} dialog box with blank inputs, current recipe, or null
	*/


var RecipeDialog = function (_React$Component5) {
	_inherits(RecipeDialog, _React$Component5);

	function RecipeDialog(props) {
		_classCallCheck(this, RecipeDialog);

		var _this6 = _possibleConstructorReturn(this, (RecipeDialog.__proto__ || Object.getPrototypeOf(RecipeDialog)).call(this, props));

		_this6.handleChange = _this6.handleChange.bind(_this6);
		_this6.handleChange = _this6.handleChange.bind(_this6);
		_this6.handleCancel = _this6.handleCancel.bind(_this6);
		return _this6;
	}

	//updates dialog input/textarea by sending vals to parent that holds state


	_createClass(RecipeDialog, [{
		key: 'handleChange',
		value: function handleChange(e) {
			var recipe = e.target.parentNode.recipeinput.value;
			var ingredients = [e.target.parentNode.ingredientinput.value];
			this.props.onChange({ recipe: recipe, ingredients: ingredients });
		}

		//calls parent onSave to save recipe to parent state

	}, {
		key: 'handleSubmit',
		value: function handleSubmit(e) {
			var recipe = e.target.recipeinput.value.trim();
			var ingredients = ingredientsToArray(e.target.ingredientinput.value);
			recipe && this.props.onSave({ dialog: this.props.dialog,
				recipe: recipe,
				ingredients: ingredients });
			e.preventDefault();
			e.target.reset();
		}

		//calls parent onCancel func to close dialog box

	}, {
		key: 'handleCancel',
		value: function handleCancel() {
			this.props.onCancel();
		}
	}, {
		key: 'render',
		value: function render() {
			var dialog = this.props.dialog;
			var className = 'dialog';
			var dialogHeading = null;
			var output = null;

			if (dialog) {
				var recipe = this.props.recipe;
				var ingredients = '';
				var submitButton = null;

				if (dialog == 'edit') {
					className += ' edit-dialog';
					dialogHeading = React.createElement(
						'div',
						{ className: 'dialog-heading' },
						'Edit Recipe'
					);
					ingredients = ingredientsToString(this.props.ingredients);
					submitButton = React.createElement(
						'button',
						{ className: 'dialog-add-btn btn btn-info', type: 'submit' },
						'Edit'
					);
				} else {
					className += ' add-dialog';
					ingredients = this.props.ingredients.toString();
					dialogHeading = React.createElement(
						'div',
						{ className: 'dialog-heading' },
						'Add Recipe'
					);
					submitButton = React.createElement(
						'button',
						{ className: 'dialog-add-btn btn btn-primary', type: 'submit' },
						'Add'
					);
				}
				output = React.createElement(
					'div',
					{ className: 'dform-container' },
					React.createElement(
						'form',
						{ id: 'dform', onSubmit: this.handleSubmit.bind(this) },
						React.createElement(
							'label',
							{ 'for': 'recipeinput' },
							'Recipe Name'
						),
						React.createElement('input', { id: 'recipeinput', type: 'text', name: 'recipe',
							value: recipe,
							onChange: this.handleChange }),
						React.createElement(
							'label',
							{ 'for': 'ingredientinput' },
							'Ingredients'
						),
						React.createElement('textarea', { id: 'ingredientinput', name: 'ingredients',
							value: ingredients,
							onChange: this.handleChange }),
						React.createElement(
							'div',
							{ className: 'dialog-btns' },
							submitButton,
							React.createElement(
								'button',
								{ className: 'cancel-btn btn btn-default', type: 'button',
									onClick: this.handleCancel },
								'Cancel'
							)
						)
					)
				);
			}

			return React.createElement(
				'div',
				{ className: 'dialog-container' },
				React.createElement(
					'div',
					{ className: 'dialog-box' },
					dialogHeading,
					output
				)
			);
		}
	}]);

	return RecipeDialog;
}(React.Component);

/**
	*		@desc React Class renders recipeBox & holds state for all App components
	*		@returns {HTML} recipeBox, dialogs, and buttons
	*/


var RecipeBox = function (_React$Component6) {
	_inherits(RecipeBox, _React$Component6);

	function RecipeBox(props) {
		_classCallCheck(this, RecipeBox);

		var _this7 = _possibleConstructorReturn(this, (RecipeBox.__proto__ || Object.getPrototypeOf(RecipeBox)).call(this, props));

		_this7.handleDelete = _this7.handleDelete.bind(_this7);
		_this7.handleClick = _this7.handleClick.bind(_this7);
		_this7.handleSave = _this7.handleSave.bind(_this7);
		_this7.handleInputChange = _this7.handleInputChange.bind(_this7);
		_this7.handleCancel = _this7.handleCancel.bind(_this7);

		_this7.state = { recipeBox: [],
			curObj: { recipe: '', ingredients: '' },
			dialog: false,
			index: undefined
		};
		return _this7;
	}

	//deletes recipe row whwn delete button clicked


	_createClass(RecipeBox, [{
		key: 'handleDelete',
		value: function handleDelete(index) {
			var tempBox = this.state.recipeBox;
			tempBox.splice(index, 1);
			this.setState({ recipeBox: tempBox,
				curObj: { recipe: '', ingredients: '' },
				dialog: false,
				index: undefined });
			localStorage.setItem('_username_recipeBox', JSON.stringify(this.state.recipeBox));
		}

		//opens add or edit dialog box when 'Add Recipe' or 'Edit' btns clicked

	}, {
		key: 'handleClick',
		value: function handleClick(stateObj) {
			this.setState({ curObj: { recipe: stateObj.recipe, ingredients: stateObj.ingredients },
				dialog: stateObj.dialog,
				index: stateObj.index });
			document.getElementById('dform') && document.getElementById('dform').reset();
		}

		//update internal recipeBox state based dialog values on save

	}, {
		key: 'handleSave',
		value: function handleSave(stateObj) {
			var curObj = { recipe: stateObj.recipe, ingredients: stateObj.ingredients };
			var tempBox = this.state.recipeBox;
			if (stateObj.dialog == 'edit') {
				tempBox.splice(this.state.index, 1, curObj);
			} else {
				tempBox.push(curObj);
			}
			this.setState({ recipeBox: tempBox,
				curObj: { recipe: '', ingredients: '' },
				dialog: false,
				index: undefined
			});
			localStorage.setItem('_username_recipeBox', JSON.stringify(this.state.recipeBox));
		}

		//controlled component function for dialog boxes

	}, {
		key: 'handleInputChange',
		value: function handleInputChange(recipeObj) {
			this.setState({ curObj: { recipe: recipeObj.recipe,
					ingredients: recipeObj.ingredients } });
		}

		//reset dialog state to close dialog box when cancel button clicked

	}, {
		key: 'handleCancel',
		value: function handleCancel() {
			this.setState({ dialog: false, curObj: { recipe: '', ingredients: '' } });
		}

		//set recipeBox state to value saved in local storage, if available, before render

	}, {
		key: 'componentWillMount',
		value: function componentWillMount() {
			var recipeBox = JSON.parse(localStorage.getItem('_username_recipeBox')) || this.state.recipeBox;
			this.setState({ recipeBox: recipeBox });
		}
	}, {
		key: 'render',
		value: function render() {
			var dialogBox = React.createElement(RecipeDialog, { dialog: this.state.dialog,
				recipe: this.state.curObj.recipe,
				ingredients: this.state.curObj.ingredients,
				onChange: this.handleInputChange,
				onSave: this.handleSave,
				onCancel: this.handleCancel });

			return React.createElement(
				'div',
				{ className: 'recipe-box' },
				React.createElement(
					'h4',
					null,
					'Recipes'
				),
				React.createElement(
					'div',
					{ className: 'recipe-data' },
					React.createElement(RecipeOutput, { onClick: this.handleClick,
						dialog: this.state.dialog,
						recipeBox: this.state.recipeBox,
						onSave: this.handleSave,
						onDelete: this.handleDelete,
						onCancel: this.handleCancel })
				),
				React.createElement(AddRecipeButton, { onClick: this.handleClick,
					dialog: this.state.dialog,
					recipeBox: this.state.recipeBox,
					onSave: this.handleSave,
					onCancel: this.handleCancel }),
				this.state.dialog && dialogBox
			);
		}
	}]);

	return RecipeBox;
}(React.Component);

/**
	*		Static Page Components
	*/

/**
	*		@desc React Class renders page header
	*		@returns {HTML} page header
	*/


var PageHeader = function (_React$Component7) {
	_inherits(PageHeader, _React$Component7);

	function PageHeader() {
		_classCallCheck(this, PageHeader);

		return _possibleConstructorReturn(this, (PageHeader.__proto__ || Object.getPrototypeOf(PageHeader)).apply(this, arguments));
	}

	_createClass(PageHeader, [{
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				{ className: 'pg-header' },
				React.createElement(
					'h1',
					{ className: 'pg-title' },
					'Your Recipe Box'
				)
			);
		}
	}]);

	return PageHeader;
}(React.Component);

/**
	*		@desc React Class renders page footer
	*		@returns {HTML} page header
	*/


var PageFooter = function (_React$Component8) {
	_inherits(PageFooter, _React$Component8);

	function PageFooter() {
		_classCallCheck(this, PageFooter);

		return _possibleConstructorReturn(this, (PageFooter.__proto__ || Object.getPrototypeOf(PageFooter)).apply(this, arguments));
	}

	_createClass(PageFooter, [{
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				{ className: 'pg-footer' },
				React.createElement(
					'span',
					{ className: 'pg-author' },
					'\xA9 2017 Isaac Burbank'
				),
				React.createElement(
					'span',
					{ className: 'pg-copyright' },
					React.createElement(
						'a',
						{ href: 'https://github.com/IMBurbank/customizable-recipe-box', target: '_blank' },
						'GitHub Repo'
					)
				)
			);
		}
	}]);

	return PageFooter;
}(React.Component);

/**
	*		Full App Class
	*/

/**
	*		@desc React Class renders full page
	*		@returns {HTML} full app
	*/


var App = function (_React$Component9) {
	_inherits(App, _React$Component9);

	function App() {
		_classCallCheck(this, App);

		return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
	}

	_createClass(App, [{
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				{ className: 'pg' },
				React.createElement(PageHeader, null),
				React.createElement(
					'div',
					{ className: 'content' },
					React.createElement(RecipeBox, null)
				),
				React.createElement(PageFooter, null)
			);
		}
	}]);

	return App;
}(React.Component);

/**
	*		Render App to DOM
	*/

/**
	*		@desc ReactDOM renders app to HTML root node
	*		@returns {DOM} full page
	*/


ReactDOM.render(React.createElement(App, null), document.getElementById('root'));