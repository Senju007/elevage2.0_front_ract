/* eslint-disable prettier/prettier */
import faker from 'faker';
import PropTypes from 'prop-types';
import { noCase } from 'change-case';
import { useRef, useState , useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { set, sub, formatDistanceToNow } from 'date-fns';
import { Icon } from '@iconify/react';
import bellFill from '@iconify/icons-eva/bell-fill';
import clockFill from '@iconify/icons-eva/clock-fill';
import doneAllFill from '@iconify/icons-eva/done-all-fill';
// material
import { alpha } from '@material-ui/core/styles';
import {
  Box,
  List,
  Badge,
  Button,
  Avatar,
  Tooltip,
  Divider,
  IconButton,
  Typography,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  ListItemButton
} from '@material-ui/core';
// utils
import { mockImgAvatar } from '../../utils/mockImages';
// components
import Scrollbar from '../../components/Scrollbar';
import MenuPopover from '../../components/MenuPopover';
import NourritureDataService from '../../services/NourrirureServices';

// ----------------------------------------------------------------------

function renderContent(notification) {
  const nom = (
    <Typography variant="subtitle2">
      {notification.nom}
      <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
        &nbsp; {noCase(notification.date_debut)}
      </Typography>
    </Typography>
  );

  if (notification.etat === 'Terminé') {
    return {
      nom
    };
  }
  if (notification.etat === 'En cours') {
    return {
      nom
    };
  }
  return {
    nom
  };
}

NotificationItem.propTypes = {
  notification: PropTypes.object.isRequired
};

function NotificationItem({ notification }) {
  const { nom } = renderContent(notification);

  return (
    <ListItemButton
      to="#"
      disableGutters
      component={RouterLink}
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
        ...(notification.etat && {
          bgcolor: 'action.selected'
        })
      }}
    >
      <ListItemText
        primary={nom}
        secondary={
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              display: 'flex',
              alignItems: 'center',
              color: 'text.disabled'
            }}
          >
            <Box component={Icon} icon={clockFill} sx={{ mr: 0.5, width: 16, height: 16 }} />
            {formatDistanceToNow(new Date(notification.date_fin))}
          </Typography>
        }
      />
    </ListItemButton>
  );
}

export default function NotificationsPopover() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [nourriture, setNourriture] = useState([]);
  const totalUnRead = nourriture.filter((item) => item.etat === "En cours").length;
  const encours = nourriture.filter((item) => item.etat === "En cours").length;
  const terminer = nourriture.filter((item) => item.etat === "Terminé").length;
 
  useEffect(() => {
    retrieveNourriture();
  }, []);

  const retrieveNourriture = () => {
    NourritureDataService.getAll()
      .then(response => {
        setNourriture(response.data);
        setNotifications(response.data)
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };





  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        etat: "Terminé"
      }))
    );
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        size="large"
        color={open ? 'primary' : 'default'}
        onClick={handleOpen}
        sx={{
          ...(open && {
            bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity)
          })
        }}
      >
        <Badge badgeContent={totalUnRead} color="error">
          <Icon icon={bellFill} width={20} height={20} />
        </Badge>
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 360 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notifications</Typography>
            {/* <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              You have {totalUnRead} unread messages
                </Typography> */}
          </Box>

         {/*  {totalUnRead > 0 && (
            <Tooltip title=" Mark all as read">
              <IconButton color="primary" onClick={handleMarkAllAsRead}>
                <Icon icon={doneAllFill} width={20} height={20} />
              </IconButton>
            </Tooltip>
          )} */}

        </Box>

        <Divider />

        <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}>
          <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                Nourriture
              </ListSubheader>
            }
          >
            {notifications.slice(0, encours).map((notification) => (
              <NotificationItem key={notification.id} notification={notification} />
            ))}
          </List>

          <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                Soins
              </ListSubheader>
            }
          >
            {notifications.slice(encours, 4).map((notification) => (
              <NotificationItem key={notification.nom} notification={notification} />
            ))}
          </List>
        </Scrollbar>

        <Divider />

        <Box sx={{ p: 1 }}>
          <Button fullWidth disableRipple component={RouterLink} to="#">
            View All
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}
