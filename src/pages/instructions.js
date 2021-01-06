import React, { useEffect, useRef, useState } from "react"
import { usePageHeadingsTree } from "use-page-headings-tree"
import { graphql } from "gatsby"
import { PrismCode } from "../components/YouVisitIWC/prismcode"
import IWCLocation from "../components/iwc-location"

import Layout from "../components/Layout"

export const query = graphql`
  query($instID: String) {
    yv {
      institutions(instID: $instID) {
        locations {
          loc_id
          name
          experience_type
          cover_photo {
            thumb
            full
          }
          stops {
            stopid
            title
            panoramas {
              smallurl
            }
          }
        }
        name
        inst_id
      }
    }
  }
`

const yvTag = {
  backgroundColor: "#00355f",
  color: "white",
  borderRadius: "5px",
  display: "inline-block",
  padding: ".25em .5em",
  fontWeight: "bold",
}

const embedCodeTag = {
  backgroundColor: "#00b1b0",
  color: "white",
  borderRadius: "5px",
  display: "inline-block",
  padding: ".25em .5em",
  fontWeight: "bold",
}
const successTag = {
  backgroundColor: "#ed8b00",
  color: "white",
  borderRadius: "5px",
  display: "inline-block",
  padding: ".25em .5em",
  fontWeight: "bold",
}

const InstructionsPage = ({ data }) => {
  const headingsContainerRef = useRef()
  const [pageHeadingNodes, setPageHedingNodes] = useState([])
  const [pageHeadingTree, setPageHeadingTree] = useState(null)

  useEffect(() => {
    const headingNodes = headingsContainerRef.current.querySelectorAll("h2,h3")
    setPageHedingNodes(headingNodes)
  }, [])

  usePageHeadingsTree(pageHeadingNodes, setPageHeadingTree, false)

  const renderNodeList = node => (
    <li key={node.id}>
      <a href={"#" + node.id}>{node.text}</a>
      {node.childNodes.length > 0 ? (
        <ul>{node.childNodes.map(renderNodeList)}</ul>
      ) : null}
    </li>
  )

  const datum = data.yv.institutions
  const name = datum.name
  const title = `Virtual Tour Installation Instructions for ${name}`
  const firstLocation = datum.locations[0].loc_id
  const locations = datum.locations
  const experience_type = datum.locations[0].experience_type
  const allStops = datum.locations[0].stops
  let stops = ""
  if (experience_type === "vt") {
    stops = allStops.map((stop, index) => {
      return (
        <div key={index}>
          {/* <h4>{stop.title}</h4> */}
          <IWCLocation
            containerWidth="100%"
            containerHeight="500px"
            title={locations.name}
            institution={datum.inst_id}
            type=""
            location={locations.loc_id}
            showCode="false"
            dataStopid={stop.stopid}
          />
        </div>
      )
    })
  }

  let stopsCodes = ""
  if (experience_type === "vt") {
    stopsCodes = allStops.map((stop, index) => {
      const immersiveBannerCode = `
  <a alt="Launch Experience" href="https://www.youvisit.com/#/vte/?data-platform=v&data-link-type=immersive&data-inst=${datum.inst_id}&data-image-width=100%&data-image-height=100%&data-loc=${stop.stopid}&">Launch Experience</a>
  `
      const hyperlinkCode = `
  <a alt="Launch Experience" href="https://www.youvisit.com/#/vte/?data-platform=v&data-inst=${datum.inst_id}&data-image-width=100%&data-image-height=100%&data-loc=${stop.stopid}&">Launch Experience</a>

  `
      return (
        <tr key={index}>
          <td>
            {stop.title}
            <IWCLocation
              containerWidth="100%"
              containerHeight="200px"
              title={stop.title}
              institution={datum.inst_id}
              type=""
              location={locations.loc_id}
              dataStopid={stop.stopid}
            />
          </td>
          <td>
            {/* <PrismCode code={immersiveBannerCode} language="html" /> */}
            <code>{immersiveBannerCode}</code>
          </td>
          <td>
            {/* <PrismCode code={hyperlinkCode} language="html" /> */}
            <code>{hyperlinkCode}</code>
          </td>
        </tr>
      )
    })
  }

  const institutionID = datum.inst_id
  const yvcode = `
          <script async="async" defer="defer" src="https://www.youvisit.com/tour/Embed/js3"></script>
          `

  return (
    <Layout title={title}>
      {pageHeadingTree ? <ul>{pageHeadingTree.map(renderNodeList)}</ul> : null}
      <div ref={headingsContainerRef}>
        <h2 id="unlocking-the-power">
          Unlocking The Power of Your Virtual Tour
        </h2>
        <h3 id="unlocking-the-power-tracking">
          Tracking, Launching, and Attributing
        </h3>
        <p>
          The <b>YouVisit Tag </b>is a script that is needed to successfully
          collect audience insights, launch a virtual tour, and measure
          attributions. It is a critical piece to your installation, and it is
          imperative that the YouVisit Tag be used correctly for an optimal
          launch and successful tracking of engagement and attributions.
        </p>
        <ul>
          <li>
            <span style={yvTag}>YouVisit Tag</span>

            <h4>Collect Audience Insights</h4>
            <p>
              When installed alone on a webpage, the YouVisit Tag tracks
              visitors{" "}
            </p>
            <h5>Partner benefits:</h5>
            <ul>
              <li>
                Map out how your audiences engage with different pages on your
                website and their activity
              </li>
              <p>
                <i>
                  This tracking is foundational to future data enhancements we
                  are exploring around linking users throughout the EAB Network
                  across all our offerings{" "}
                </i>
              </p>
            </ul>
          </li>

          <li>
            <span style={yvTag}>YouVisit Tag</span> +{" "}
            <span style={embedCodeTag}>Embed Code</span>
            <h4>Launch Virtual Tour</h4>
            <p>
              To embed and launch a Virtual Tour on a webpage, the YouVisit Tag
              is required to be installed with a separate{" "}
              <span style={embedCodeTag}>Embed Code</span> that tells the
              YouVisit Tag how the Virtual Tour should be rendered (width,
              height, default destination, etc...){" "}
            </p>
            <h5>Partner Benefits:</h5>
            <ul>
              <li>
                Ensure proper attribution to inquiry source (your .edu site
                rather than YouVisit)
              </li>
              <li>
                Ensure accurate tracking of audiences who engage with your
                online content in our analytics product
              </li>
              <li>
                Receive automatic updates when enhancements are rolled out
              </li>
            </ul>
          </li>

          <li>
            <span style={yvTag}>YouVisit Tag</span> +{" "}
            <span style={successTag}>Success Code</span>
            <h4>Measure Attribution</h4>
            <p>
              To quantify the impact of your Virtual Tour and show how many
              visitors got to a success page (i.e completed application) after
              visiting your Virtual Tour, the YouVisit Tag and a separate
              success code is required to be installed
            </p>
            <h5>Partner Benefits:</h5>
            <ul>
              <li>
                Quantify the impact of virtual tours&nbsp;by showing how many
                visitors&nbsp;got to a page you deem a success after visiting
                the Virtual Tour vs. without visiting the Virtual Tour
              </li>
              <li>See the conversion lift Virtual Tour brings</li>
            </ul>
          </li>
        </ul>

        <h3 id="high-impact-action-steps">High-Impact Action Steps</h3>
        <ol>
          <li>
            Install On Your Website
            <p>
              College websites continue to be a top focal point of student
              search, so make sure your virtual tour is prominently displayed.
            </p>
            <h5>Questions to Consider:</h5>
            <ul>
              <li>Where should we have an immersive banner vs. a hyperlink?</li>
              <li>
                Where should we launch into the main experience vs. specific
                scenes?
              </li>
            </ul>
            <aside>
              <p>
                For the highest engagement, we recommend leveraging an
                eye-catching immersive banner in places, such as the body and
                footer of web pages, as well as hyperlinks in other relevant
                spots, such as the navigation menu.
              </p>
              <p>
                In addition, we recommend that you use immersive banners that
                launch into specific tour stops on relevant pages. For example,
                embed Athletics tour stop on Athletics page; embed Student
                Center/Dining Hall on Student Life, embed Residence Halls on
                Housing page, key program stops on relevant academic program
                pages, etc.)
              </p>
            </aside>
          </li>

          <li>
            Include In Your Marketing
            <p>
              Consider how you can leverage your Virtual Tour to bring your
              marketing campaigns to life.
            </p>
            <h5>Questions to Consider:</h5>
            <ul>
              <li>Where are we reaching out to students? &nbsp;</li>
              <li>How are we conducting virtual visits?&nbsp;</li>
              <li>
                How are we enabling students and families to conduct self-guided
                tours on campus?&nbsp;
              </li>
            </ul>
            <aside>
              <p>
                Add the Virtual Tour to email, text, and social communications
              </p>
              <p>
                Host live Virtual Tour walkthroughs with a Student Ambassador
                and/or faculty member
              </p>
              <p>
                Leverage self guided options available based on your partnership
              </p>
            </aside>
          </li>
          <li>
            Keep it Fresh
            <p>
              Meet with your Partner Success team quarterly and revisit your
              placement &amp; promotion strategy, informed by your evolving
              strategy and tour/tour stop performance.
            </p>
            <h5>Questions to Consider:</h5>
            <ul>
              <li>
                Did we see spikes in performance on a particular point of
                interest and/or time frame?
              </li>
              <li>Have we received student feedback?</li>
              <li>
                How might it make sense to tweak the tour itself using existing
                content to support our evolving strategy?&nbsp;
              </li>
            </ul>
            <aside>
              <p>Monitor performance to optimize content</p>
              <p>
                Ask students for feedback on if the tour was easy to find or
                what was the most interesting about it?
              </p>
              <p>
                Consider new buildings or programs, seasonal events, or new
                voices that might resonate most with prospective students
              </p>
            </aside>
          </li>
        </ol>

        <h2 id="directly-on-website">Directly on Website</h2>
        <h3 id="directly-on-website-embed">Embed and Launch</h3>
        <h4>Immersive Banner</h4>
        <p>
          The <span style={embedCodeTag}>Embed Code</span> and{" "}
          <span style={yvTag}>YV TAG</span>
          can be directly embedded in multiple locations per page, on multiple
          pages, and there are two ways to launch the virtual tour on your
          website:
        </p>
        <ul>
          <li>
            {stops[0]}
            Place this <span style={embedCodeTag}>Embed Code</span> on your
            respective pages to install the experience
            <PrismCode
              code={`
<a alt="Launch Experience" href="https://www.youvisit.com/#/vte/?data-platform=v&data-link-type=immersive&data-inst=${datum.inst_id}&data-image-width=100%&data-image-height=100%&">Launch Experience</a>
`}
              language="html"
            />
            <p>
              <b>Change the % to alter the size of the banner</b>
            </p>
          </li>
          <li>
            Place the <span style={yvTag}>YV TAG</span> above the{" "}
            <code>&lt;/body&gt;</code>
            tag on each page you place the code
            <PrismCode code={yvcode} language="html" />
            <p>
              <b>The script must go below the link to successfully launch </b>
            </p>
          </li>
        </ul>
        <p>
          <b>
            Need more help? View our instructional video{" "}
            <a href="https://www.youvisit.com/squarespace-embed/">here</a>.
          </b>
        </p>
        <h3 id="directly-on-website-tracking-success">Tracking Success</h3>
        <p>
          Once the virtual tour is successfully embedded on your website, you
          will want to track the success. Adding the{" "}
          <span style={successTag}>SUCCESS CODE</span> and{" "}
          <span style={yvTag}>YV TAG</span> to your website is as simple as
          adding 2 lines of javascript code in your funnel confirmation page.
        </p>
        <h4>Installation</h4>
        <ol>
          <li>
            URLS for Call to Action targets (typically a form) - Ex: URL of a
            form complete 'thank you' page
            <p>
              <b>Paste the provided script tag above the body tag:</b>
              <PrismCode
                code={`
<script>
    var yv_launch_success=true,
    yv_instid=${institutionID},
    yv_locid=${firstLocation};
</script>
<script src="https://www.youvisit.com/tour/Success/js3"></script>
`}
                language="html"
              />
            </p>
          </li>
        </ol>
        <h4>Advanced Instructions</h4>
        <p>
          If you don't have a success/confirmation page or need to call the
          success tag on demand, the YouVisit script can accommodate such
          scenarios. For example, if you show Javascript confirmation pop-up
          rather than forwarding the user to a success page after registering,
          then you can follow these steps to call the success tag on demand.
        </p>
        <ol>
          <li>
            Step 1: Paste the provided script tag above the &lt;/body&gt; tag:
            <p>
              <PrismCode
                code={`
<script>
    var yv_launch_success=true,
    yv_instid=${institutionID},
    yv_locid=${firstLocation};
</script>
<script src="https://www.youvisit.com/tour/Success/js3"></script>
`}
                language="html"
              />
            </p>
          </li>
          Once the success condition is met, execute the following Javascript
          call
          <p>
            <PrismCode
              code={`
SuccessScript.embedSuccess();
`}
              language="javascript"
            />
          </p>
        </ol>
        <h2 id="google-tag-manager">Google Tag Manager</h2>
        <h3 id="google-tag-manager-installing-the-tag">Installing the Tag</h3>
        <p>
          The following is the set of steps needed to install the{" "}
          <span style={yvTag}>YV TAG</span>.The tag is a tracking script that
          reads your <span style={embedCodeTag}>Embed Code</span> to launch your
          virtual tour. We recommend triggering the tag to run on all pages in
          order to eliminate needing to include it with each{" "}
          <span style={embedCodeTag}>Embed Code</span> and for enhanced
          tracking.
        </p>
        <h4>Login to GTM</h4>
        <p>
          <a href="https://tagmanager.google.com">
            https://tagmanager.google.com
          </a>
        </p>
        <h4>Create a tag in GTM</h4>
        <p>Workspace &gt; Tags &gt; New &gt; Custom HTML</p>
        <ol>
          <li>Add a title to the tag – Ex: “Virtual Tour Tracking”</li>
          <li>
            Tag Configuration
            <p>
              <b>
                Paste the following <span style={yvTag}>YV TAG</span> in the
                custom HTML field:
              </b>
              <PrismCode
                code={`
<script src="https://www.youvisit.com/tour/Success/js3"></script>
`}
                language="html"
              />
            </p>
          </li>
          <li>
            Triggering
            <p>
              Define the URLs/Patterns for the locations you want the tag to be
              included.{" "}
              <b>
                Include <span style={yvTag}>YV TAG</span> on all pages
              </b>
            </p>
          </li>
          <li>Hit ”Save” in upper right-hand corner</li>
          <li>Be sure to publish the changes through the main GTM page</li>
        </ol>
        <p>
          <b>
            The tag must be successfully installed in order to be able to launch
            your experience and track success.
          </b>
        </p>
        <h3 id="google-tag-manager-launching">Launching</h3>
        <p>
          Once the is <span style={yvTag}>YV TAG</span> running on your site,
          you need to add the <span style={embedCodeTag}>Embed Code</span>
          into the html of the pages you want your virtual tour to display on.
          Your virtual tour can be embedded in multiple locations per page, on
          multiple pages, and there are two ways to launch the virtual tour on
          your website:
        </p>
        <p>
          <h4>Immersive Banner</h4>
        </p>
        {stops[0]}
        <ol>
          <li>
            Write text on the page where you’d like the immersive banner to
            display – Ex: “Virtual Tour”
          </li>
          <li>
            Hyperlink the text on your page to the below{" "}
            <span style={embedCodeTag}>Embed Code</span> URL:
            <p>
              <PrismCode
                code={`
<a alt="Launch Experience" href="https://www.youvisit.com/#/vte/?data-platform=v&data-link-type=immersive&data-inst=${datum.inst_id}&data-image-width=100%&data-image-height=100%&">Launch Experience</a>
`}
                language="html"
              />
            </p>
          </li>
          <li>
            Done. Now the tag will search the page, see the link, and transform
            it into an immersive banner
          </li>
        </ol>

        <h3 id="google-tag-manager-tracking-success">Tracking Success</h3>
        <p>
          Once the <span style={yvTag}>YV TAG</span> is running on your site and
          you’ve successfully launched your virtual tour, you will want to track
          the success via the Success Tag.
        </p>
        <h4>Required Items</h4>
        <h4>Login to GTM</h4>
        <p>
          <a href="https://tagmanager.google.com">
            https://tagmanager.google.com
          </a>
        </p>
        <h4>Create a tag in GTM</h4>

        <p>Workspace &gt; Tags &gt; New &gt; Custom HTML</p>
        <ul>
          <li>Add a title to the tag – Ex: “Virtual Tour Success”</li>
          <li>
            Tag Configuration
            <p>
              <b>Paste the provided into the HTML text area: </b>
            </p>
            <PrismCode
              code={`
<script>
    var yv_launch_success=true, yv_instid=123, yv_locid=123;
</script>
<script src="https://www.youvisit.com/tour/Success/js3"></script>
`}
              language="html"
            />
          </li>
          <li>
            Triggering
            <p>
              Add the URLs of pages that you have deemed a ‘success’ or a
              conversion - EX: “Schedule campus visit” confirmation page
            </p>
          </li>
        </ul>

        <h2 id="additional-embed-codes">Additional Embed Codes</h2>
        <p>
          You can embed your Virtual Tour to launch directly into specific
          scenes. Using the same installation methods outlined in this document,
          alter the code with custom location id’s to launch directly into the
          destination relevant to the page it lives on.{" "}
        </p>
        <h4>Example</h4>
        <p>
          For example, embed your tour so that it launches directly into your
          “Music Program” destination from your Music Program page.
        </p>
        <p>
          See custom <span style={embedCodeTag}>Embed Codes</span> for each
          Destination on your virtual tour below.
        </p>
        <table>
          <thead>
            <tr>
              <th>Destination Name</th>
              <th>Immersive Banner</th>
              <th>Hyperlink</th>
            </tr>
          </thead>
          <tbody>{stopsCodes}</tbody>
        </table>
      </div>
    </Layout>
  )
}

export default InstructionsPage
