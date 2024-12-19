const express = require('express');
const { PostRegister, getallRegister, putRegister, deleteRegister, getbyUser } = require('../Auth/RegisterController');
const { LoginController, getProfile, verifyToken } = require('../Auth/LoginController');
const upload = require('../middleware/multerconfig');
const { createService, getAllServices, getServiceByUrl, updateService, deleteService } = require('../controller/ServiceController');
const { createSector, getAllSector, getSectorByUrl, updateSector, deleteSector } = require('../controller/SectorCotroller');
const { createSectorDetail, getAllSectorDetails, getSectorDetailById, updateSectorDetail, deleteSectorDetail, getSectorDetailBySectorUrl } = require('../controller/SectorDetailContoller');
const { createBanner, getAllBanners, getBannerById, updateBanner, deleteBanner } = require('../controller/Bannercontroller');
const { createCleint, getAllCleints, getCleintById, updateCleint, deleteCleint } = require('../controller/CleintController');
const { createSocial, getAllSocials, getSocialById, updateSocial, deleteSocial } = require('../controller/SocialController');
const { createContact, getAllContacts, getContactById, updateContact, deleteContact } = require('../controller/ContactController');
const { createAbout, getAllAboutUs, updateAbout, deleteAbout } = require('../controller/AboutusController');

const router = express.Router();


router.post('/register', PostRegister);

// Get all registered users (Admin access)
router.get('/users', verifyToken, getallRegister);

// Update User Information (Admin access)
router.put('/users', verifyToken, putRegister);

// Delete User (Admin access)
router.delete('/users', verifyToken, deleteRegister);

// Get User by Type
router.get('/users/type', getbyUser);

// User Login
router.post('/login', LoginController);

// Get User Profile
router.get('/profile', verifyToken, getProfile);



//service


router.post('/services', upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'icon', maxCount: 1 }
]), createService);

router.get('/services', getAllServices);
router.get('/services/:url', getServiceByUrl);
router.put('/services/:url', upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'icon', maxCount: 1 }
]), updateService);
router.delete('/services/:url', deleteService);

//sector


router.post('/sectors', upload.single('image'), createSector);


router.get('/sectors', getAllSector);


router.get('/sectors/:url', getSectorByUrl);


router.put('/sectors/:url', upload.single('image'), updateSector);


router.delete('/sectors/:url', deleteSector);


//sector detail



// Create a new sector detail
router.post('/sector-details', createSectorDetail);

// Get all sector details
router.get('/sector-details', getAllSectorDetails);

// Get a single sector detail by ID
router.get('/sector-details/:id', getSectorDetailById);


router.put('/sector-details/:id', updateSectorDetail);

// Delete a sector detail by ID
router.delete('/sector-details/:id', deleteSectorDetail);

// Get sector detail by sector URL
router.get('/sector-details/sector/:url', getSectorDetailBySectorUrl)



//banner


router.post('/banners', upload.single('image'), createBanner);
router.get('/banners', getAllBanners);
router.get('/banners/:id', getBannerById);
router.put('/banners/:id', upload.single('image'), updateBanner);
router.delete('/banners/:id', deleteBanner);


// cleints


router.post('/cleints', upload.single('image'), createCleint);
router.get('/cleints', getAllCleints);
router.get('/cleints/:id', getCleintById);
router.put('/cleints/:id', upload.single('image'), updateCleint);
router.delete('/cleints/:id', deleteCleint);


//social

router.post('/socials', upload.single('image'), createSocial);
router.get('/socials', getAllSocials);
router.get('/socials/:id', getSocialById);
router.put('/socials/:id', upload.single('image'), updateSocial);
router.delete('/socials/:id', deleteSocial)

//contact


router.post('/contact', upload.single('image'), createContact);
router.get('/contact', getAllContacts);
router.get('/contact/:id', getContactById);
router.put('/contact/:id', upload.single('image'), updateContact);
router.delete('/contact/:id', deleteContact)



// about us

router.post('/about', upload.single('image'), createAbout)
router.get('/about', getAllAboutUs)
router.put('/about/:id', upload.single('image'), updateAbout)
router.delete('/about/:id', deleteAbout)


module.exports = router;