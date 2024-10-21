import { HomeComponent } from "../component/HomeComponent.jsx";
import { CatalogComponent } from "../component/CatalogComponent.jsx";
import { ProductComponent } from "../component/ProductComponent.jsx";

export const Home = () => {
    return (
        <>
        <div>
        <HomeComponent />
        <CatalogComponent />
        <ProductComponent />
        </div>
        </>
    );
};