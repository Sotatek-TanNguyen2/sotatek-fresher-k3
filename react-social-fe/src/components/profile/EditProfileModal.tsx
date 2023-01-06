import { CancelOutlined } from '@mui/icons-material';
import {
  Avatar,
  Badge,
  Box,
  Button,
  Dialog,
  Grid,
  IconButton,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import React, { useState } from 'react';
import AddIcon from '../../assets/icons/add-circle.svg';
import CameraIcon from '../../assets/icons/camera.svg';
import EditIcon from '../../assets/icons/edit.svg';
import InstagramIcon from '../../assets/icons/instagram.svg';
import LinkedinIcon from '../../assets/icons/linkedin.svg';
import ImgAva from '../../assets/images/avatar.svg';
import { Input } from '../../pages/Auth/styled';
import { CustomDivider, RowStack, Subtitle } from '../common/styled';
import {
  CancelButton,
  CustomInput,
  Item,
  ModalTitle,
  SaveButton,
  TextContent,
  Title,
} from './styled';

interface EditProfileModalProps {
  open: boolean;
  handleClose: any;
}

const EditProfileModal: React.FC<EditProfileModalProps> = (
  props: EditProfileModalProps
) => {
  const [isEditName, setIsEditName] = useState<boolean>(false);
  const [isEditLocation, setIsEditLocation] = useState<boolean>(false);
  const [isEditBio, setIsEditBio] = useState<boolean>(false);
  // const [isEditSocial, setIsEditSocial] = useState<boolean[]>([
  //   false,
  //   false,
  //   false,
  // ]);
  const [isAddSocial, setIsAddSocial] = useState<boolean>(false);
  const [socialType, setSocialType] = useState<string>('instagram');
  const [name, setName] = useState<string>('Nguyen Mai Anh');
  const [location, setLocation] = useState<string>('Hanoi');
  const [bio, setBio] = useState<string>(
    "The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here',"
  );
  // const [social, setSocial] = useState<string[]>([
  //   'maianh_1312',
  //   'maianh_1312',
  //   'maianh_1312',
  // ]);

  const handleEditName = () => {
    setIsEditName(true);
  };

  const handleEditLocation = () => {
    setIsEditLocation(true);
  };

  const handleEditBio = () => {
    setIsEditBio(true);
  };

  const handleAddSocial = () => {
    setIsAddSocial(true);
  };

  const handleSaveName = () => {
    setIsEditName(false);
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSaveLocation = () => {
    setIsEditLocation(false);
    setLocation(location);
  };

  const handleChangeLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const handleSaveBio = () => {
    setIsEditBio(false);
  };

  const handleChangeBio = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBio(e.target.value);
  };

  const handleChangeSocialType = (e: SelectChangeEvent) => {
    setSocialType(e.target.value as string);
  };

  const handleSaveNewSocial = () => {
    setIsAddSocial(false);
  };

  return (
    <Dialog
      sx={{
        '& .MuiDialog-paper': {
          minWidth: 800,
          bgcolor: '#fff',
          borderRadius: 5,
          padding: '32px 47px 34px 59px',
        },
      }}
      open={props.open}
      onClose={props.handleClose}
    >
      <IconButton
        sx={{
          position: 'absolute',
          top: 20,
          right: 20,
        }}
        size="small"
        onClick={props.handleClose}
      >
        <CancelOutlined />
      </IconButton>
      <ModalTitle>Edit Profile</ModalTitle>

      <RowStack>
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          badgeContent={
            <IconButton
              sx={{
                width: 32,
                height: 32,
                bgcolor: '#c8c8c8',
                '&:hover': {
                  bgcolor: '#c8c8c8',
                },
              }}
            >
              <img src={CameraIcon} alt="camera" />
            </IconButton>
          }
        >
          <Avatar sx={{ width: 96, height: 96 }} src={ImgAva} />
        </Badge>
        {isEditName ? (
          <Box flexGrow={1} ml={2.5}>
            <Input
              size="small"
              fullWidth
              multiline
              rows={2}
              type="text"
              value={name}
              onChange={handleChangeName}
              sx={{
                '& .MuiInputBase-input': {
                  fontSize: 24,
                  fontWeight: 600,
                  color: '#29282b',
                  lineHeight: '36px',
                },
              }}
            />
          </Box>
        ) : (
          <Title ml={2.25}>{name}</Title>
        )}
        {!isEditName && (
          <IconButton size="small" onClick={handleEditName}>
            <img src={EditIcon} alt="edit" />
          </IconButton>
        )}
      </RowStack>
      {isEditName && (
        <>
          <RowStack mt={1.5} justifyContent="flex-end">
            <CancelButton>Cancel</CancelButton>
            <SaveButton onClick={handleSaveName}>Save</SaveButton>
          </RowStack>
          <CustomDivider />
        </>
      )}

      <Box
        sx={{
          marginTop: isEditName ? 0 : 3,
        }}
      >
        <Box>
          <RowStack mb={1}>
            <Title>Location</Title>
            <IconButton size="small" onClick={handleEditLocation}>
              <img src={EditIcon} alt="edit" />
            </IconButton>
          </RowStack>
          {isEditLocation ? (
            <>
              <CustomInput
                fullWidth
                type="text"
                size="small"
                value={location}
                onChange={handleChangeLocation}
              />
              <RowStack mt={1.5} justifyContent="flex-end">
                <CancelButton>Cancel</CancelButton>
                <SaveButton onClick={handleSaveLocation}>Save</SaveButton>
              </RowStack>
            </>
          ) : (
            <TextContent>{location}</TextContent>
          )}
        </Box>

        <CustomDivider />

        <Box>
          <RowStack mb={1}>
            <Title>Bio</Title>
            <IconButton size="small" onClick={handleEditBio}>
              <img src={EditIcon} alt="edit" />
            </IconButton>
          </RowStack>
          {isEditBio ? (
            <>
              <CustomInput
                fullWidth
                multiline
                type="text"
                size="small"
                value={bio}
                onChange={handleChangeBio}
              />
              <RowStack mt={1.5} justifyContent="flex-end">
                <CancelButton>Cancel</CancelButton>
                <SaveButton onClick={handleSaveBio}>Save</SaveButton>
              </RowStack>
            </>
          ) : (
            <TextContent>{bio}</TextContent>
          )}
        </Box>

        <CustomDivider />

        <Box>
          <Title>My pages</Title>
          <RowStack mt={2}>
            <Avatar
              sx={{
                width: 36,
                height: 36,
              }}
              src={InstagramIcon}
              alt=""
            />
            <Subtitle
              sx={{
                flexGrow: 1,
                ml: 1.5,
              }}
            >
              maianh_1312
            </Subtitle>
            <IconButton size="small">
              <img src={EditIcon} alt="edit" />
            </IconButton>
          </RowStack>
          <RowStack mt={1}>
            <Avatar
              sx={{
                width: 36,
                height: 36,
              }}
              src={LinkedinIcon}
              alt=""
            />
            <Subtitle
              sx={{
                flexGrow: 1,
                ml: 1.5,
              }}
            >
              maianh_1312
            </Subtitle>
            <IconButton size="small">
              <img src={EditIcon} alt="edit" />
            </IconButton>
          </RowStack>

          {isAddSocial && (
            <Grid container spacing={2} mt={2}>
              <Grid item xs={9}>
                <CustomInput
                  fullWidth
                  type="text"
                  placeholder="Enter username"
                  sx={{
                    '& .MuiInputBase-input': {
                      padding: '12px 20px 12px 25px',
                      fontSize: 16,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <Select
                  fullWidth
                  value={socialType}
                  onChange={handleChangeSocialType}
                  sx={{
                    borderRadius: '6px',
                    '& .MuiSelect-select': {
                      padding: '12px 20px 12px 25px',
                      fontSize: 14,
                      fontWeight: 500,
                      bgcolor: '#f5f5f5',
                    },
                    '& fieldset': {
                      border: '0 !important',
                    },
                  }}
                >
                  <Item value="facebook">Facebook</Item>
                  <Item value="instagram">Instagram</Item>
                  <Item value="linkedin">LinkedIn</Item>
                </Select>
              </Grid>
            </Grid>
          )}

          <RowStack mt={isAddSocial ? 4 : 3} justifyContent="space-between">
            <Button
              startIcon={<img src={AddIcon} alt="" />}
              size="small"
              sx={{
                textTransform: 'none',
                color: '#8954C2',
                fontSize: 16,
                fontWeight: 500,
              }}
              onClick={handleAddSocial}
            >
              Add a website
            </Button>
            {isAddSocial && (
              <RowStack justifyContent="flex-end">
                <CancelButton>Cancel</CancelButton>
                <SaveButton onClick={handleSaveNewSocial}>Save</SaveButton>
              </RowStack>
            )}
          </RowStack>
        </Box>
      </Box>
    </Dialog>
  );
};

export default EditProfileModal;
