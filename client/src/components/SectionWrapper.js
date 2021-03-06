import { Link } from "react-router-dom";
import { StyledSection } from "../styles";

const SectionWrapper = ({ children, title, seeAllLink, seeAllText = "See All", breadcrumb = false, back = false, navigate }) => (
	<StyledSection>
		<div className="section__inner">
			<div className="section__top">
				<h2 className="section__heading">
					{breadcrumb && (
						<span className="section__breadcrumb">
							<Link to="/">Profile</Link>
						</span>
					)}
					{back && (
						<span className="section__breadcrumb">
							<a type="button" onClick={() => navigate(-1)}>
								<span>Back</span>
							</a>
						</span>
					)}
					{title && <>{seeAllLink ? <Link to={seeAllLink}>{title}</Link> : <span>{title}</span>}</>}
				</h2>
				{seeAllLink && (
					<Link to={seeAllLink} className="section__see-all">
						{seeAllText}
					</Link>
				)}
			</div>

			{children}
		</div>
	</StyledSection>
);

export default SectionWrapper;
