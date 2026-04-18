import { GovUkHeaderLogo } from "./GovUkHeaderLogo";

export interface GovUkHeaderProps {
  homepageUrl?: string;
  productName?: string;
}

export function GovUkHeader({
  homepageUrl = "https://www.gov.uk",
  productName = "GOV.UK",
}: GovUkHeaderProps) {
  return (
    <div className="govuk-header" data-module="govuk-header">
      <div className="govuk-header__container govuk-width-container">
        <div className="govuk-header__logo">
          <GovUkHeaderLogo
            homepageUrl={homepageUrl}
            productName={productName}
          />
        </div>
      </div>
    </div>
  );
}
