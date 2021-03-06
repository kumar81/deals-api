import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DealProductPage from './deal_product_listing'

class DealDetailPage extends Component {
	constructor(props){
		super(props);
		this.state = {
			dealsTitle: [],
			dealsBody: [],
			dealsBannerImage: [],
			dealsTermId: '',
		}
	}
	componentDidMount() {
		let dealsTitle = this.props.match.params.specificDeals.replace(/-/g, ' ');
		let URL = 'https://dev-deals-api.pantheonsite.io/deals/' + dealsTitle + '?_format=json';
		let URL_TERM_ID = 'https://dev-deals-api.pantheonsite.io/deal/termid/' + dealsTitle + '?_format=json';
		fetch(URL)
		.then(response => response.json())
		.then(data => {
			let title = data.map((dtitle) => {
				return(
					<div key={dtitle.title}>
						{dtitle.title}
					</div>
				)
			})
			let body = data.map((dbody) => {
				return(
					<div key={dbody.body}>
						{dbody.body}
					</div>
				)
			})
			let bannerImage = data.map((dbannerimage) => {
				return(
					<div key={dbannerimage.field_banner_image}>
						{dbannerimage.field_banner_image}
					</div>
				)
			})
			this.setState({dealsTitle: title, dealsBody: body, dealsBannerImage:bannerImage[0].props.children.split(',')})
		});
		fetch(URL_TERM_ID)
		.then(response => response.json())
		.then(data => this.setState({dealsTermId: data[0].tid}))
	}

	render() {
		if (!this.state.dealsBannerImage) {
			return <span>Loading...</span>;
		}
		const settings = {
			arrows: true,
			dots: true,
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1
		  };
		return (
			<div>
				<Slider {...settings}>
					{this.state.dealsBannerImage.map((dbi) => (
						<div key={dbi}>
							<img style= {{ width: '100%' }} src={'https://dev-deals-api.pantheonsite.io/' + dbi} alt={this.state.dealsTitle[0].key} />
						</div>
					))}
				</Slider>
				<Typography component='div' variant='h3' style={{ position: 'relative', bottom: '65px', margin: '0px 35px', color: 'white' }}>
					{this.state.dealsTitle}
				</Typography>
				<DealProductPage dTermId= {this.state.dealsTermId}/>
			</div>
		);
	}
}
export default DealDetailPage;
