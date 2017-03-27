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
	let tArr = arr.filter(function(el) {
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
	let arr = removeBlankElements(str.split(','));
	arr.forEach(function(el, i) {
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
	let tArr = removeBlankElements(arr);
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
class AddRecipeButton extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		this.props.onClick({	dialog: 'add',
													recipe: '',
													ingredients: '',
													index: undefined
		});
	}

	render() {
		return (
			<div>
				<button className='add-btn btn btn-primary'
								type='button' onClick={this.handleClick}>
					Add Recipe
				</button>
			</div>
		);
	}
}

/**
	*		@desc React Class rendered button updates parent state to open edit dialog
	*		@param {RecipeBox~Callback} props.onClick - update parent dialog state
	*		@param {String} props.recipe - name of this recipe
	*		@param {Array} props.ingredients - name of this ingredient list
	*		@param {Number} props.index - index of this recipe element
	*		@returns {HTML} edit recipe button
	*/
class EditRecipeButton extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		this.props.onClick({ 	dialog: 'edit',
													recipe: this.props.recipe,
													ingredients: this.props.ingredients ,
													index: this.props.index
		});
	}

	render() {
		return (
				<button className='edit-btn btn btn-info'
								type='button' onClick={this.handleClick}>
					Edit
				</button>
		);
	}
}

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
class RecipeRow extends React.Component {
	constructor(props) {
		super(props);
		this.handleDelete = this.handleDelete.bind(this);
	}

	handleDelete() {
		this.props.onDelete(this.props.index);
	}

	render() {
		const index = this.props.index;
		const collapseId = 'recipedetail' + index;
		let ingredients = this.props.ingredients.map( (el) => { return (
			<div className='ingredient'>{el}</div>
		)});
		return (
			<div className='recipe-row'>
				<button className='recipe-name' type="button" data-toggle="collapse"
								data-target={['#' + collapseId]} aria-expanded="false"
								aria-controls={collapseId} >
					{this.props.recipe}
				</button>
				<div id={collapseId} className='collapse recipe-details'>
					<div className='ing-list'>{ingredients}</div>
					<div className='recipe-btns'>
						<EditRecipeButton	onClick={this.props.onClick}
															dialog={this.props.dialog}
															recipe={this.props.recipe}
															ingredients={this.props.ingredients}
															onSave={this.props.onSave}
															onCancel={this.props.onCancel}
															onDelete={this.props.onDelete}
															index={this.props.index}	/>
						<button className='delete-btn btn btn-danger'
										type='button' onClick={this.handleDelete} >
							Delete
						</button>
					</div>
				</div>
			</div>
		);
	}
}

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
class RecipeOutput extends React.Component {
	render() {
		const recipeBox = this.props.recipeBox;
		let output = null;

		if (recipeBox.length > 0) {
			output = recipeBox.map( (el, i) => { return (
					<RecipeRow	onClick={this.props.onClick}
											dialog={this.props.dialog}
											recipe={el.recipe}
											ingredients={el.ingredients}
											onSave={this.props.onSave}
											onCancel={this.props.onCancel}
											onDelete={this.props.onDelete}
											index={i} />
			)});
		} else {
			output = <div className='empty-msg'>Recipe box is empty</div>
		}
		return (
			<div className='recipe-output'>{output}</div>
		);
	}
}

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
class RecipeDialog extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
	}

	//updates dialog input/textarea by sending vals to parent that holds state
	handleChange(e) {
		const recipe = e.target.parentNode.recipeinput.value;
		const ingredients = [e.target.parentNode.ingredientinput.value];
		this.props.onChange({recipe: recipe, ingredients: ingredients});
	}

	//calls parent onSave to save recipe to parent state
	handleSubmit(e) {
		const recipe =  e.target.recipeinput.value.trim();
		const ingredients = ingredientsToArray( e.target.ingredientinput.value);
		(recipe && this.props.onSave({	dialog: this.props.dialog,
																		recipe: recipe,
																		ingredients: ingredients})
			);
		e.preventDefault();
		e.target.reset();
	}

	//calls parent onCancel func to close dialog box
	handleCancel() {
		this.props.onCancel();
	}

	render() {
		const dialog = this.props.dialog;
		let className = 'dialog';
		let dialogHeading = null;
		let output = null;

		if (dialog) {
			const recipe = this.props.recipe;
			let ingredients = '';
			let submitButton = null;

			if (dialog == 'edit') {
				className += ' edit-dialog';
				dialogHeading = <div className='dialog-heading'>Edit Recipe</div>;
				ingredients = ingredientsToString(this.props.ingredients);
				submitButton = <button className='dialog-add-btn btn btn-info' type='submit'>Edit</button>;
			} else {
				className += ' add-dialog';
				ingredients = this.props.ingredients.toString();
				dialogHeading = <div className='dialog-heading'>Add Recipe</div>;
				submitButton = <button className='dialog-add-btn btn btn-primary' type='submit'>Add</button>;
			}
			output = (
				<div className='dform-container'>
					<form id='dform' onSubmit={this.handleSubmit.bind(this)}>
						<label for='recipeinput'>Recipe Name</label>
						<input 	id='recipeinput' type='text' name='recipe'
										value={recipe}
										onChange={this.handleChange}	/>
						<label for='ingredientinput'>Ingredients</label>
						<textarea id='ingredientinput' name='ingredients'
											value={ingredients}
											onChange={this.handleChange}	/>
						<div className='dialog-btns'>
							{submitButton}
							<button className='cancel-btn btn btn-default' type='button'
											onClick={this.handleCancel}>Cancel</button>
						</div>
					</form>
				</div>
			);
		}

		return (
			<div className='dialog-container'>
				<div className='dialog-box'>
					{dialogHeading}
					{output}
				</div>
			</div>
		);
	}
}

/**
	*		@desc React Class renders recipeBox & holds state for all App components
	*		@returns {HTML} recipeBox, dialogs, and buttons
	*/
class RecipeBox extends React.Component {
	constructor(props) {
		super(props)
		this.handleDelete = this.handleDelete.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleSave = this.handleSave.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleCancel = this.handleCancel.bind(this);

		this.state = {recipeBox: [],
									curObj: { recipe: '', ingredients: '' },
								 	dialog: false,
									index: undefined
		};
	}

	//deletes recipe row whwn delete button clicked
	handleDelete(index) {
		let tempBox = this.state.recipeBox;
		tempBox.splice(index, 1);
		this.setState({ recipeBox: tempBox,
										curObj: { recipe: '', ingredients: '' },
										dialog: false,
										index: undefined });
		localStorage.setItem('_username_recipeBox', JSON.stringify(this.state.recipeBox));
	}

	//opens add or edit dialog box when 'Add Recipe' or 'Edit' btns clicked
	handleClick(stateObj) {
		this.setState({ curObj: {recipe: stateObj.recipe, ingredients: stateObj.ingredients},
										dialog: stateObj.dialog,
										index: stateObj.index});
		(document.getElementById('dform') && document.getElementById('dform').reset() );
	}

	//update internal recipeBox state based dialog values on save
	handleSave(stateObj) {
		const curObj = { recipe: stateObj.recipe, ingredients: stateObj.ingredients };
		let tempBox = this.state.recipeBox;
		if (stateObj.dialog == 'edit') {
			tempBox.splice( this.state.index, 1, curObj );
		} else {
			tempBox.push(curObj);
		}
		this.setState({	recipeBox: tempBox,
										curObj: { recipe: '', ingredients: '' },
								 		dialog: false,
										index: undefined
		});
		localStorage.setItem('_username_recipeBox', JSON.stringify(this.state.recipeBox));
	}

	//controlled component function for dialog boxes
	handleInputChange(recipeObj) {
		this.setState({ curObj: { recipe: recipeObj.recipe,
															ingredients: recipeObj.ingredients } });
	}

	//reset dialog state to close dialog box when cancel button clicked
	handleCancel() {
		this.setState({ dialog: false, curObj: {recipe: '', ingredients: ''} });
	}

	//set recipeBox state to value saved in local storage, if available, before render
	componentWillMount() {
		const recipeBox = JSON.parse(localStorage.getItem('_username_recipeBox')) ||
					this.state.recipeBox;
		this.setState({recipeBox: recipeBox});
	}

	render() {
		const dialogBox = (
			<RecipeDialog dialog={this.state.dialog}
										recipe={this.state.curObj.recipe}
										ingredients={this.state.curObj.ingredients}
										onChange={this.handleInputChange}
										onSave={this.handleSave}
										onCancel={this.handleCancel}	/>
		);

		return (
			<div className='recipe-box'>
				<h4>Recipes</h4>
				<div className='recipe-data'>
					<RecipeOutput	onClick={this.handleClick}
												dialog={this.state.dialog}
												recipeBox={this.state.recipeBox}
												onSave={this.handleSave}
												onDelete={this.handleDelete}
												onCancel={this.handleCancel}	/>
				</div>
				<AddRecipeButton	onClick={this.handleClick}
													dialog={this.state.dialog}
													recipeBox={this.state.recipeBox}
													onSave={this.handleSave}
													onCancel={this.handleCancel}	/>
				{this.state.dialog && dialogBox}
			</div>
		);
	}
}

/**
	*		Static Page Components
	*/

/**
	*		@desc React Class renders page header
	*		@returns {HTML} page header
	*/
class PageHeader extends React.Component {
	render() {
		return (
			<div className='pg-header'>
				<h1 className='pg-title'>Your Recipe Box</h1>
			</div>
		);
	}
}

/**
	*		@desc React Class renders page footer
	*		@returns {HTML} page header
	*/
class PageFooter extends React.Component {
	render() {
		return (
			<div className='pg-footer'>
				<span className='pg-author'>By: Isaac Burbank</span>
				<span className='pg-copyright'>© 2017 All right reserved.</span>
			</div>
		);
	}
}

/**
	*		Full App Class
	*/

/**
	*		@desc React Class renders full page
	*		@returns {HTML} full app
	*/
class App extends React.Component {
	render() {
		return (
			<div className='pg'>
				<PageHeader />
				<div className='content'>
					<RecipeBox />
				</div>
				<PageFooter />
			</div>
		);
	}
}

/**
	*		Render App to DOM
	*/

/**
	*		@desc ReactDOM renders app to HTML root node
	*		@returns {DOM} full page
	*/
ReactDOM.render (
	<App />,
	document.getElementById('root')
);
