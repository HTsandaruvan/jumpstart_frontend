import React, { useEffect, useState } from "react";
import { EyeIcon } from "../../assets/SvgIcons";
import Layout from "../../components/Layout";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { AlertMessage } from "../../components/AlertMessage";
import { CategoryBadge } from "../../components/CategoryBadge";
import useDocumentTitle from "../useDocumentTitle";
import NotFound from "../NotFound";
import { showSnapshotDetailsBySlugApi } from "../../api/user-api";
import { useAuthUser, useIsAuthenticated } from "react-auth-kit";
import { formatDate } from "../../utils/utils";

const ProductSnapshot = () => {
  const auth = useAuthUser();
  const role = auth()?.role?.[0]
  const token = auth()?.token
  const isLogin = useIsAuthenticated()
  const isAdmin = isLogin() && role === "ROLE_ADMIN"
  const navigate = useNavigate();
  const [isNotFound, setIsNotFound] = useState(false);

  const [alertMessage, setAlertMessage] = useState(null)

  const { slug } = useParams();
  const [snapshot, setSnapshot] = useState({
    id: 0,
    productName: "",
    slug: "",
    category: {
      categoryName: "",
      categorySlug: ""
    },
    description: "",
    price: 0,
    oldPrice: 0,
    weight: 0,
    productCreatedAt: "",
    lastUpdatedAt: "",
    snapshotAt: "",
    quantity: 0,
    itemPriceTotal: 0,
    product: {
      productId: 0,
      slug: ""
    }
  })
  useDocumentTitle(`[Snapshot] + ${snapshot.productName}`)


  useEffect(() => {
    window.scrollTo(0, 0)
    showSnapshotDetailsBySlugApi(token, slug)
      .then(res => {
        setSnapshot(res.data.result)
      })
      .catch(error => {
        if (typeof error === "string") {
          console.log("Error message: " + error)
        } else {
          if (error.status === 404) {
            setIsNotFound(true)
          }
          else if (error.status === 500) {
            navigate("/")
          }
        }
      })
  }, [slug])

  return (
    <>
      {isNotFound ? (<NotFound />) : (
        <Layout>
          <div className='py-10 sm:flex sm:flex-wrap sm:flex-col gap-y-10 md:grid md:grid-cols-12 px-5 sm:px-5 md:px-36 lg:px-20'>
            <div className='mx-5 sm:col-span-12 md:col-span-12 lg:col-span-4'>
              <div className="aspect-square border rounded">
                {snapshot?.image ?
                  (<img
                    src={`data:image/jpeg;base64,${snapshot?.image}`}
                    alt="product thumbnail"
                    className="object-contain w-full h-full rounded" />) :
                  (<img src="https://static.vecteezy.com/system/resources/previews/004/745/297/non_2x/3d-isometric-paper-shopping-bag-in-circle-icon-shopping-bag-for-advertising-and-branding-collection-for-retail-design-for-web-page-ui-mobile-illustration-for-products-and-things-free-vector.jpg" alt="product thumbnail" className="object-contain w-full h-full rounded" />)
                }
              </div>
            </div>
            <div className='mx-5 sm:col-span-12 md:col-span-12 lg:col-span-5 bg-white opacity-80'>
              <div className="hidden sm:hidden md:hidden lg:block mb-4">
                <AlertMessage messageType="info" message={`This is a detailed view of this product ordered on ${formatDate(snapshot.snapshotAt)}`} />
              </div>
              <h1 className="text-xl font-semibold">{snapshot.productName}</h1>
              <div className="text-4xl font-bold">${snapshot.price.toLocaleString("en-US")}</div>
              <div className="text-4xl font-bold">${snapshot.oldPrice.toLocaleString("en-US")}</div>

              <hr className="my-3" />

              <h1 className="text-xl font-semibold">Details</h1>
              <div>Weight: {snapshot.weight} kg</div>
              <div>Category: <CategoryBadge categoryName={snapshot.category.categoryName} categoryUrl={snapshot.category.categorySlug} /></div>

              <hr className="my-3" />

              <h1 className="text-xl font-semibold">Description</h1>
              <p className="paragraph">{snapshot.description}</p>
            </div>
            <div className='fixed bottom-0 left-0 right-0 z-10 lg:static sm:col-span-12 md:col-span-12 lg:col-span-3'>
              <div className="p-5 rounded bg-white border shadow">
                <div className="xs:block sm:block md:block lg:hidden mb-2">
                  <AlertMessage messageType="info" message={`This is a detailed view of this product ordered on ${formatDate(snapshot.snapshotAt)}`} />
                </div>
                {!snapshot.product && <div className="text-gray-500 mb-2">Product unavailable</div>}
                <button
                  type="button"
                  onClick={() => navigate(`/p/${snapshot.product?.slug}`)}
                  disabled={!snapshot.product}
                  className="btn btn-primary w-full"
                >
                  See original product
                </button>
              </div>
            </div>
          </div >
        </Layout >
      )}
    </>
  )
}

export default ProductSnapshot;