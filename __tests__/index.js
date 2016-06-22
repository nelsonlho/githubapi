import * as chai from 'chai';
import {shallow, mount} from 'enzyme';
import List from '../src/pages/List';
import App from '../src/pages/App';

describe('Components',function(){
	describe('App component',function(){
		it('has a div with classnameapp',function(){
			const wrapper = shallow(<App><div/></App>);
			chai.expect(wrapper.contains(<h1>GitHub Rail Issues</h1>)).to.equal(true);
		});

		it('has initial state with loading false',function(){
			const wrapper = shallow(<App><div/></App>);
			chai.expect(wrapper.state().loading).to.equal(false);
		});
		it('has initial state with issues null',function(){
			const wrapper = shallow(<App><div/></App>);
			chai.expect(wrapper.state().issues).to.equal(null);
		});

		it('renders loading class when loading key in state is true ',function(){
			const wrapper = shallow(<App><div/></App>);
			wrapper.setState({loading:true})
			chai.expect(wrapper.find(".app_loading")).to.have.length(1);
		});

		it('does not render app class when loading key in state is true ',function(){
			const wrapper = shallow(<App><div/></App>);
			wrapper.setState({loading:true})
			chai.expect(wrapper.find(".app")).to.have.length(0);
		});

		it('renders app class when loading key in state is false ',function(){
			const wrapper = shallow(<App><div/></App>);
			wrapper.setState({loading:false})
			chai.expect(wrapper.find(".app")).to.have.length(1);
		});
		it('does not render app_loading class when loading key in state is false ',function(){
			const wrapper = shallow(<App><div/></App>);
			wrapper.setState({loading:false})
			chai.expect(wrapper.find(".app_loading")).to.have.length(0);
		});

	});


	describe('List component',function(){
		it('Has a paragraph',function(){
			const wrapper = shallow(<List/>);
			chai.expect(wrapper.contains(<p>Please choose a repository from the list below.</p>)).to.equal(true);
		});
	});
});